'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Send, Check, AlertCircle, Loader2, Mail, Globe, Building2, MapPin } from 'lucide-react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) { setError('Please fill in all fields'); return; }
    setSending(true); setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) throw new Error('Failed to send');
      setSent(true);
    } catch { setError('Failed to send. Please try again later.'); }
    setSending(false);
  };

  if (sent) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="text-green-600" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Message sent!</h2>
        <p className="text-gray-500 mb-6">We will get back to you shortly.</p>
        <Link href="/" className="text-primary-600 hover:underline">&larr; Home</Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6">
          <ArrowLeft size={18} /> Home
        </Link>

        <h1 className="text-4xl font-bold text-primary-900 mb-2">Contact ShabbatHub</h1>
        <p className="text-gray-600 mb-8">
          ShabbatHub is a free project of <strong>Education On The Go Corp</strong>, a 501(c)(3) nonprofit organization based in Brooklyn, New York.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-8 space-y-5">
              <h2 className="text-xl font-bold text-primary-900 mb-4">Contact Information</h2>

              <div className="flex items-start gap-3">
                <Mail size={20} className="text-primary-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <a href="mailto:contact@edonthego.org" className="text-primary-600 hover:underline">contact@edonthego.org</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Globe size={20} className="text-primary-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Website</p>
                  <a href="https://edonthego.org" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">edonthego.org</a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Building2 size={20} className="text-primary-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Organization</p>
                  <p className="text-gray-600">Education On The Go Corp</p>
                  <p className="text-gray-500 text-sm">501(c)(3) Nonprofit &middot; EIN: 92-1172505</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={20} className="text-primary-600 mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-700">Address</p>
                  <p className="text-gray-600">Brooklyn, New York, USA</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-xl font-bold text-primary-900 mb-4">Send a Message</h2>
            {error && <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg flex items-center gap-2"><AlertCircle size={16} />{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea value={message} onChange={e => setMessage(e.target.value)} rows={5} className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:border-primary-500 outline-none resize-none" required />
              </div>
              <button type="submit" disabled={sending} className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors">
                {sending ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                {sending ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
