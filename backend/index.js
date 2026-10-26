import express from 'express';
import multer from 'multer';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const __dirname = path.resolve();
const UPLOAD_DIR = path.join(__dirname, 'uploads');
const NOTIFY_EMAIL = process.env.NOTIFY_EMAIL || 'kgroupkenya@gmail.com';
const ADMIN_TOKEN = process.env.ADMIN_TOKEN || '';

// ---- CORS: the live site, any local dev port, plus anything in CORS_ORIGINS
const extraOrigins = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
const allowedOrigins = ['https://kgroupkenya.netlify.app', ...extraOrigins];
const isLocal = origin => /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin);
app.use(cors({
  origin: (origin, cb) => {
    // no Origin header = curl, server-to-server, same-origin
    if (!origin || allowedOrigins.includes(origin) || isLocal(origin)) return cb(null, true);
    return cb(null, false);
  },
  credentials: true
}));
app.use(express.json({ limit: '100kb' }));
app.use('/uploads', express.static(UPLOAD_DIR));

// ---- helpers
const escapeHtml = value => String(value ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;')
  .replace(/"/g, '&quot;')
  .replace(/'/g, '&#39;');

const clean = (value, max = 255) => (value == null ? '' : String(value).trim().slice(0, max));
const isEmail = value => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// Admin-only routes. If ADMIN_TOKEN is set, callers must send it in the x-admin-token header.
const requireAdmin = (req, res, next) => {
  if (!ADMIN_TOKEN) return next();
  if (req.get('x-admin-token') === ADMIN_TOKEN) return next();
  return res.status(401).json({ error: 'Unauthorized' });
};

// ---- Multer setup (audio and video only)
fs.mkdirSync(UPLOAD_DIR, { recursive: true });
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, UPLOAD_DIR),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const safeName = path.basename(file.originalname).replace(/[^\w.\- ()+]/g, '_');
    cb(null, uniqueSuffix + '-' + safeName);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (/^(audio|video)\//.test(file.mimetype)) return cb(null, true);
    cb(new Error('Only audio and video files are allowed'));
  }
});

const METADATA_FILE = path.join(__dirname, 'mixes.json');

function readMixes() {
  if (!fs.existsSync(METADATA_FILE)) return [];
  try {
    return JSON.parse(fs.readFileSync(METADATA_FILE, 'utf-8'));
  } catch (err) {
    console.error('mixes.json is not valid JSON:', err.message);
    return [];
  }
}
function writeMixes(mixes) {
  fs.writeFileSync(METADATA_FILE, JSON.stringify(mixes, null, 2));
}

// ---- MySQL
const dbConfig = {
  host: process.env.MYSQL_HOST || 'localhost',
  port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'djkach',
};
const db = mysql.createPool(dbConfig);

// Create the database and tables on start if they are missing.
async function initDb() {
  try {
    const { database, ...serverConfig } = dbConfig;
    const conn = await mysql.createConnection(serverConfig);
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${database}\``);
    await conn.end();
    await db.query(`CREATE TABLE IF NOT EXISTS Bookings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(100),
      lastName VARCHAR(100),
      email VARCHAR(150),
      phone VARCHAR(50),
      eventType VARCHAR(100),
      eventDate DATE,
      venue VARCHAR(200),
      guests INT,
      budget VARCHAR(100),
      message TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    await db.query(`CREATE TABLE IF NOT EXISTS CompanyEnquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      firstName VARCHAR(100),
      lastName VARCHAR(100),
      email VARCHAR(150),
      phone VARCHAR(50),
      companyEnquire VARCHAR(100),
      additionalDetails TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
    console.log('Database ready');
    return true;
  } catch (err) {
    console.error('Database is not available:', err.code || err.message);
    return false;
  }
}

// ---- Email
const smtpPort = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 465;
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: smtpPort,
  secure: smtpPort === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

async function sendNotificationEmail(subject, html) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP_USER / SMTP_PASS not set, skipping email notification');
    return;
  }
  await transporter.sendMail({
    from: process.env.SMTP_USER,
    to: NOTIFY_EMAIL,
    subject,
    html,
  });
}

const row = (label, value) => `<li><b>${escapeHtml(label)}:</b> ${escapeHtml(value)}</li>`;

// ---- Routes
app.get('/', (req, res) => res.json({ ok: true, service: 'K-GROUP KENYA API' }));
app.get('/api/health', async (req, res) => {
  try {
    await db.query('SELECT 1');
    res.json({ ok: true, database: 'up' });
  } catch (err) {
    res.status(503).json({ ok: false, database: 'down' });
  }
});

// Upload endpoint
app.post('/api/mixes/upload', requireAdmin, upload.single('file'), (req, res) => {
  const { title, description, category, type, date, duration, size } = req.body;
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' });
  const mixes = readMixes();
  const newMix = {
    id: Date.now(),
    title,
    description,
    category,
    type, // 'audio' or 'video'
    date,
    duration,
    size,
    filename: req.file.filename,
    originalname: req.file.originalname,
    url: `/uploads/${req.file.filename}`
  };
  mixes.unshift(newMix);
  writeMixes(mixes);
  res.json({ success: true, mix: newMix });
});

// List mixes endpoint
app.get('/api/mixes', (req, res) => {
  res.json(readMixes());
});

// Delete mix endpoint
app.delete('/api/mixes/:id', requireAdmin, (req, res) => {
  const id = parseInt(req.params.id, 10);
  let mixes = readMixes();
  const mix = mixes.find(m => m.id === id);
  if (!mix) return res.status(404).json({ error: 'Mix not found' });
  const filePath = path.join(UPLOAD_DIR, path.basename(mix.filename));
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }
  mixes = mixes.filter(m => m.id !== id);
  writeMixes(mixes);
  res.json({ success: true });
});

// Download endpoint for mixes (forces download)
app.get('/api/mixes/download/:filename', (req, res) => {
  const filename = path.basename(req.params.filename);
  const filePath = path.join(UPLOAD_DIR, filename);
  if (!filePath.startsWith(UPLOAD_DIR + path.sep) || !fs.existsSync(filePath)) {
    return res.status(404).send('File not found');
  }
  res.download(filePath, filename);
});

// Event booking (Kach Sound Media)
app.post('/api/contact', async (req, res) => {
  const firstName = clean(req.body.firstName, 100);
  const lastName = clean(req.body.lastName, 100);
  const email = clean(req.body.email, 150);
  const phone = clean(req.body.phone, 50);
  const eventType = clean(req.body.eventType, 100);
  const eventDate = clean(req.body.eventDate, 10);
  const venue = clean(req.body.venue, 200);
  const budget = clean(req.body.budget, 100);
  const message = clean(req.body.message, 5000);
  const guestsNum = parseInt(req.body.guests, 10);
  const guests = Number.isFinite(guestsNum) && guestsNum > 0 ? guestsNum : null;

  if (!firstName || !lastName || !email || !phone || !eventType || !eventDate || !venue) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!isEmail(email)) return res.status(400).json({ error: 'Please enter a valid email address' });
  if (!/^\d{4}-\d{2}-\d{2}$/.test(eventDate) || Number.isNaN(Date.parse(eventDate))) {
    return res.status(400).json({ error: 'Please enter a valid event date' });
  }

  try {
    await db.query(
      `INSERT INTO Bookings (firstName, lastName, email, phone, eventType, eventDate, venue, guests, budget, message)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, email, phone, eventType, eventDate, venue, guests, budget || null, message || null]
    );
  } catch (err) {
    console.error('Booking insert failed:', err.code || err.message);
    return res.status(500).json({ error: 'We could not save your request right now. Please call or WhatsApp us instead.' });
  }
  res.json({ success: true });
  // Send email notification in the background
  sendNotificationEmail(
    'New Kach Sound Media Booking',
    `<h2>New Booking (Kach Sound Media)</h2><ul>
      ${row('First Name', firstName)}${row('Last Name', lastName)}${row('Email', email)}${row('Phone', phone)}
      ${row('Event Type', eventType)}${row('Event Date', eventDate)}${row('Venue', venue)}
      ${row('Guests', guests ?? '')}${row('Budget', budget)}${row('Additional Details', message)}
    </ul>`
  ).catch(err => console.error('Email send error:', err.message));
});

// Enquiry form for the company pages and the contacts page
app.post('/api/bookings', async (req, res) => {
  const firstName = clean(req.body.firstName, 100);
  const lastName = clean(req.body.lastName, 100);
  const email = clean(req.body.email, 150);
  const phone = clean(req.body.phone, 50);
  const companyEnquire = clean(req.body.companyEnquire, 100);
  const additionalDetails = clean(req.body.additionalDetails, 5000);

  if (!firstName || !lastName || !email || !phone || !companyEnquire) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  if (!isEmail(email)) return res.status(400).json({ error: 'Please enter a valid email address' });

  try {
    await db.query(
      `INSERT INTO CompanyEnquiries (firstName, lastName, email, phone, companyEnquire, additionalDetails)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [firstName, lastName, email, phone, companyEnquire, additionalDetails || null]
    );
  } catch (err) {
    console.error('Enquiry insert failed:', err.code || err.message);
    return res.status(500).json({ error: 'We could not save your request right now. Please call or WhatsApp us instead.' });
  }
  res.json({ success: true });
  sendNotificationEmail(
    `New Company Enquiry: ${companyEnquire}`,
    `<h2>New Company Enquiry</h2><ul>
      ${row('First Name', firstName)}${row('Last Name', lastName)}${row('Email', email)}${row('Phone', phone)}
      ${row('Company Enquire', companyEnquire)}${row('Additional Details', additionalDetails)}
    </ul>`
  ).catch(err => console.error('Email send error:', err.message));
});

// ---- Error handling (bad JSON, upload errors)
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) return res.status(400).json({ error: err.message });
  if (err.type === 'entity.parse.failed') return res.status(400).json({ error: 'Invalid JSON' });
  if (err.message === 'Only audio and video files are allowed') return res.status(400).json({ error: err.message });
  console.error(err);
  res.status(500).json({ error: 'Something went wrong' });
});

initDb().finally(() => {
  app.listen(PORT, () => {
    console.log(`Backend server running on port ${PORT}`);
  });
});
