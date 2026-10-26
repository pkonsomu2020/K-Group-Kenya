import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from './ui/form';

const subsidiaries = [
  { value: 'kach-sound-media', label: 'Kach Sound Media' },
  { value: 'links-auto-motors', label: 'Links Auto Motors' },
  { value: 'breakout-events', label: 'Breakout Events' },
  { value: 'kbr-tv', label: 'KBR TV' },
  { value: 'kbr-radio', label: 'KBR Radio' },
  { value: 'breakout-bible-fellowship', label: 'Breakout Bible Fellowship' },
  { value: 'kbr-academy', label: 'KBR Academy' },
  { value: 'covnt', label: 'COVNT.' },
];

export default function BookingForm({ companyEnquire }: { companyEnquire?: string }) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const form = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      companyEnquire: companyEnquire || '',
      additionalDetails: '',
    },
  });

  const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

  async function onSubmit(values) {
    setStatus('idle');
    setErrorMsg('');
    try {
      const res = await fetch(`${API_BASE}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json();
        setStatus('error');
        setErrorMsg(data.error || 'Submission failed.');
        return;
      }
      setStatus('success');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 text-left max-w-xl mx-auto md:mx-0">
      <h3 className="text-2xl font-bold mb-6 text-brand-red text-center">Send Booking Request</h3>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField name="firstName" control={form.control} rules={{ required: 'First name is required' }}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="mb-0">First Name *</FormLabel>
                  <FormControl>
                    <input type="text" className="w-full px-4 py-2 rounded border border-gray-300 text-black" placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField name="lastName" control={form.control} rules={{ required: 'Last name is required' }}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="mb-0">Last Name *</FormLabel>
                  <FormControl>
                    <input type="text" className="w-full px-4 py-2 rounded border border-gray-300 text-black" placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <FormField name="email" control={form.control} rules={{ required: 'Email is required' }}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="mb-0">Email Address *</FormLabel>
                  <FormControl>
                    <input type="email" className="w-full px-4 py-2 rounded border border-gray-300 text-black" placeholder="your@email.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField name="phone" control={form.control} rules={{ required: 'Phone number is required' }}
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel className="mb-0">Phone Number *</FormLabel>
                  <FormControl>
                    <input type="tel" className="w-full px-4 py-2 rounded border border-gray-300 text-black" placeholder="+254 700 000 000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField name="companyEnquire" control={form.control} rules={{ required: 'Please select a company' }}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="mb-0">Company Enquire *</FormLabel>
                <FormControl>
                  {companyEnquire ? (
                    <input type="text" className="w-full px-4 py-2 rounded border border-gray-300 text-black bg-gray-100" value={companyEnquire} disabled readOnly {...field} />
                  ) : (
                    <select className="w-full px-4 py-2 rounded border border-gray-300 text-black" {...field}>
                      <option value="">Select one of the companies</option>
                      {subsidiaries.map(opt => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField name="additionalDetails" control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-1">
                <FormLabel className="mb-0">Additional Details</FormLabel>
                <FormControl>
                  <textarea className="w-full px-4 py-2 rounded border border-gray-300 text-black" rows={4} placeholder="Tell us more about your event, special requirements, music preferences, etc." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <button type="submit" className="w-full bg-brand-red text-white font-bold py-3 rounded hover:bg-red-700 transition mt-4">Send Booking Request</button>
          {status === 'success' && <div className="text-green-600 mt-4 text-center">Booking request sent successfully!</div>}
          {status === 'error' && <div className="text-red-600 mt-4 text-center">{errorMsg}</div>}
        </form>
      </Form>
    </div>
  );
} 