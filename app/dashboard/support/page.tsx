'use client';

import { useState } from 'react';
import { RiSendPlane2Line, RiChat1Line } from 'react-icons/ri';

export default function SupportPage() {
  const [subject, setSubject] = useState('');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [tickets, setTickets] = useState<
    Array<{
      id: number;
      subject: string;
      details: string;
      time: string;
      resolved?: boolean;
    }>
  >([]);
  const [message, setMessage] = useState<string | null>(null);

  async function createTicket(e?: React.FormEvent) {
    e?.preventDefault();
    if (!subject.trim() || !details.trim()) return;
    setSubmitting(true);
    setMessage(null);
    await new Promise((r) => setTimeout(r, 700));
    const ticket = {
      id: Date.now(),
      subject: subject.trim(),
      details: details.trim(),
      time: 'just now',
    };
    setTickets((t) => [ticket, ...t]);
    setSubject('');
    setDetails('');
    setSubmitting(false);
    setMessage('Ticket created.');
    setTimeout(() => setMessage(null), 3000);
  }

  const faqs = [
    {
      q: 'How do I reset my password?',
      a: 'Go to account > security and choose Reset password.',
    },
    {
      q: 'How do I invite team members?',
      a: 'Use the Team page > Invite button to add members.',
    },
    {
      q: 'Can I export reports?',
      a: 'Yes — export is available in Projects > Export.',
    },
  ];

  function resolveTicket(id: number) {
    setTickets((prev) =>
      prev.map((t) => (t.id === id ? { ...t, resolved: true } : t))
    );
    setMessage('Ticket resolved.');
    setTimeout(() => setMessage(null), 2000);
    // optionally remove after a short delay
    setTimeout(
      () => setTickets((prev) => prev.filter((t) => t.id !== id)),
      1500
    );
  }

  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold text-[color:var(--md-sys-color-on-surface)]">
          Support
        </h1>
        <p className="mt-1 text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
          Open a ticket or browse our FAQ.
        </p>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded bg-[color:var(--md-sys-color-surface)] p-6 shadow">
          <h2 className="text-lg font-medium text-[color:var(--md-sys-color-on-surface)]">
            Create a support ticket
          </h2>
          <form onSubmit={createTicket} className="mt-4 space-y-3">
            <input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Subject"
              className="w-full rounded border px-3 py-2"
            />
            <textarea
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe the issue"
              className="w-full rounded border px-3 py-2"
              rows={5}
            />

            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded bg-[color:var(--md-sys-color-primary)] px-4 py-2 text-white"
              >
                <RiSendPlane2Line />{' '}
                {submitting ? 'Submitting…' : 'Create ticket'}
              </button>
              {message && (
                <div className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                  {message}
                </div>
              )}
            </div>
          </form>

          <div className="mt-6">
            <h3 className="text-md font-medium">Recent tickets</h3>
            <div className="mt-3 space-y-3">
              {tickets.length === 0 && (
                <div className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                  No tickets yet.
                </div>
              )}
              {tickets.map((t) => (
                <div
                  key={t.id}
                  className={`rounded border p-3 ${
                    t.resolved ? 'opacity-60 line-through' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{t.subject}</p>
                      <p className="text-xs text-[color:var(--md-sys-color-on-surface-variant)]">
                        {t.details}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-xs text-gray-400">{t.time}</div>
                      {!t.resolved && (
                        <button
                          onClick={() => resolveTicket(t.id)}
                          className="rounded border px-2 py-1 text-xs"
                        >
                          Resolve
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="rounded bg-[color:var(--md-sys-color-surface)] p-6 shadow">
          <h3 className="text-lg font-medium text-[color:var(--md-sys-color-on-surface)] flex items-center gap-2">
            <RiChat1Line /> FAQ
          </h3>
          <div className="mt-3 space-y-3 text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
            {faqs.map((f, i) => (
              <details key={i} className="rounded border p-2">
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <div className="mt-2 text-sm">{f.a}</div>
              </details>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}
