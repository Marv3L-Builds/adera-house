'use client';
import { useState } from 'react';
import { CalendarDays, CheckCircle2, Search } from 'lucide-react';
import { Header, Footer } from '@/components/site-shell';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
export default function Manage() {
  const [ref, setRef] = useState('');
  const [email, setEmail] = useState('');
  const [searched, setSearched] = useState(false);
  const [request, setRequest] = useState('');
  const valid =
    ref.toUpperCase() === 'ADH-24112' || ref.toUpperCase() === 'ADH-24081';
  return (
    <main>
      <Header />
      <section className="bg-[#17221f] px-5 py-20 text-white sm:px-10 lg:px-16">
        <p className="text-xs uppercase tracking-[.2em] text-[#d0a58e]">
          Your stay
        </p>
        <h1 className="mt-4 font-serif text-5xl sm:text-8xl">
          Manage booking.
        </h1>
        <p className="mt-5 max-w-xl leading-7 text-white/60">
          Review your reservation or send our house team a change request.
        </p>
      </section>
      <section className="px-5 py-16 sm:px-10 lg:px-16">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setSearched(true);
          }}
          className="mx-auto grid max-w-4xl gap-4 border border-[#18231f]/15 bg-white p-6 sm:grid-cols-[1fr_1fr_auto]"
        >
          <label className="text-xs uppercase tracking-[.14em]">
            Booking reference
            <Input
              required
              value={ref}
              onChange={(e) => setRef(e.target.value)}
              placeholder="Try ADH-24112"
              className="mt-2 h-12 rounded-none"
            />
          </label>
          <label className="text-xs uppercase tracking-[.14em]">
            Email address
            <Input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="guest@example.com"
              className="mt-2 h-12 rounded-none"
            />
          </label>
          <Button className="h-12 self-end rounded-none px-6">
            <Search /> Find booking
          </Button>
        </form>
        {searched && !valid && (
          <div className="mx-auto mt-6 max-w-4xl border-l-2 border-[#a55338] bg-[#eee8df] p-5">
            <b>We couldn’t find that booking.</b>
            <p className="mt-1 text-sm text-[#666]">
              Check the reference in your confirmation email. For this demo, try
              ADH-24112.
            </p>
          </div>
        )}
        {searched && valid && (
          <div className="mx-auto mt-8 max-w-4xl">
            <div className="grid gap-6 bg-white p-6 sm:grid-cols-[1fr_auto]">
              <div>
                <p className="text-xs uppercase tracking-[.16em] text-green-800">
                  Confirmed · {ref.toUpperCase()}
                </p>
                <h2 className="mt-3 font-serif text-4xl">Aderin Suite</h2>
                <div className="mt-5 flex flex-wrap gap-6 text-sm text-[#62675f]">
                  <span className="flex gap-2">
                    <CalendarDays size={18} />
                    04–07 September 2026
                  </span>
                  <span>3 nights</span>
                  <span>2 guests</span>
                </div>
              </div>
              <p className="font-serif text-3xl">₦995,625</p>
            </div>
            <div className="mt-4 grid gap-4 bg-[#e7e2d9] p-6 sm:grid-cols-2">
              <div>
                <p className="text-xs uppercase tracking-[.14em] text-[#777]">
                  Add-ons
                </p>
                <p className="mt-2">Breakfast at Oro · Airport pickup</p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[.14em] text-[#777]">
                  Payment status
                </p>
                <p className="mt-2">Demo hold · No payment taken</p>
              </div>
            </div>
            <div className="mt-8 border border-[#18231f]/15 p-6">
              <h3 className="font-serif text-3xl">Need to make a change?</h3>
              <p className="mt-2 text-sm text-[#666]">
                Choose a request. In production this would be reviewed by the
                reservations team.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                {['Change dates', 'Change guests', 'Request cancellation'].map(
                  (x) => (
                    <button
                      key={x}
                      onClick={() => setRequest(x)}
                      className="min-h-11 border border-[#18231f]/20 px-4 py-3 text-xs uppercase tracking-[.12em] hover:bg-[#18231f] hover:text-white"
                    >
                      {x}
                    </button>
                  ),
                )}
              </div>
              {request && (
                <p className="mt-5 flex gap-2 bg-[#e3eadf] p-4 text-sm text-green-900">
                  <CheckCircle2 className="shrink-0" size={19} />
                  Demo request “{request}” recorded locally. No real booking was
                  changed.
                </p>
              )}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </main>
  );
}
