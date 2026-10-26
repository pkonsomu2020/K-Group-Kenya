import { ArrowUpRight } from "lucide-react";
import CompanyPage from "@/components/company/CompanyPage";
import { companyPages } from "@/data/companyPages";

const config = companyPages["covnt"];

const corporateList = [
  "Corporate and team apparel",
  "Event and group merchandise",
  "Custom branding and garment enquiries",
  "Bulk order requests",
];

const steps = [
  ["Share your brief", "Tell us the occasion, garment type, quantity and branding needs."],
  ["Discuss the options", "We can review suitable directions, specifications and a quotation."],
  ["Confirm the details", "Orders proceed after product, pricing, timing and approvals are agreed."],
];

const Eyebrow = ({ children }: { children: string }) => (
  <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-brand-red">
    <span className="h-px w-8 bg-brand-red" /> {children}
  </span>
);

const content = (
  <>
    {/* Story */}
    <section id="story" className="scroll-mt-20 bg-brand-black px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <Eyebrow>Our story & values</Eyebrow>
        <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">More than what you wear.</h2>
        <p className="mt-5 leading-relaxed text-white/75">
          COVNT. exists to raise a generation clothed in purpose, rooted in faith, and transforming the world through Christ-centred values.
        </p>
        <p className="mt-4 leading-relaxed text-white/75">
          Our mission is to create high-quality, stylish and versatile clothing that inspires confidence, expresses individuality, and reflects faith, integrity and purpose in everyday life.
        </p>
        <a href="#enquire" className="mt-7 inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 font-bold text-white transition-colors hover:bg-white hover:text-brand-black">
          Start a conversation <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </section>

    {/* Corporate */}
    <section id="corporate" className="scroll-mt-20 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid overflow-hidden rounded-3xl border border-border bg-muted md:grid-cols-2">
          <img
            src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1100&q=80"
            alt="Plain apparel ready for custom branding"
            loading="lazy"
            className="h-72 w-full object-cover md:h-full md:max-h-[28rem]"
          />
          <div className="self-center p-8 md:p-12">
            <Eyebrow>For teams & occasions</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold leading-tight md:text-4xl">Your identity. Thoughtfully worn.</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Bring your team, organisation or event together with considered apparel. Tell us what you have in mind and we can discuss the brief, garment options, branding placement, quantities and timeline.
            </p>
            <ul className="my-5">
              {corporateList.map((t) => (
                <li key={t} className="border-b border-border py-2.5 text-sm">
                  <span className="mr-3 text-brand-red">&mdash;</span>{t}
                </li>
              ))}
            </ul>
            <a href="#enquire" className="inline-flex items-center gap-2 rounded-lg bg-brand-red px-6 py-3 font-bold text-white transition-colors hover:bg-brand-black">
              Request an enquiry <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {steps.map(([title, text], i) => (
            <div key={title} className="border-t-2 border-brand-red pt-5">
              <span className="font-mono text-xs font-bold tracking-widest text-brand-red">STEP 0{i + 1}</span>
              <h3 className="mt-2 text-xl font-bold">{title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </>
);

const COVNT = () => <CompanyPage config={config} extra={content} />;

export default COVNT;
