'use client';
import { useState } from 'react';
import {
  BedDouble,
  CalendarCheck,
  CircleDollarSign,
  Hotel,
  Search,
  Settings2,
  Users,
} from 'lucide-react';
import { reservations, rooms } from '@/lib/hotel-data';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
const stats = [
  ['Occupancy', '76%', '29 of 38 rooms', Hotel],
  ['Arrivals', '8', '3 checked in', CalendarCheck],
  ['Available', '9 rooms', '4 ready now', BedDouble],
  ['Est. revenue', '₦8.42m', 'Today', CircleDollarSign],
] as const;
export default function Admin() {
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState('Overview');
  const [inventory, setInventory] = useState(
    rooms.map((r, i) => ({
      ...r,
      status: ['Available', 'Occupied', 'Cleaning', 'Maintenance'][i],
    })),
  );
  const [rates, setRates] = useState(
    Object.fromEntries(rooms.map((r) => [r.slug, r.price])) as Record<
      string,
      number
    >,
  );
  const [savedRate, setSavedRate] = useState('');
  const filtered = reservations.filter((r) =>
    `${r.guest} ${r.ref} ${r.room}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <main className="min-h-screen bg-[#eef0ec] text-[#1c2622]">
      <header className="flex h-20 items-center justify-between border-b bg-[#15211d] px-5 text-white lg:px-8">
        <div>
          <p className="text-[10px] uppercase tracking-[.2em] text-white/50">
            Adera House
          </p>
          <p className="font-serif text-2xl">House desk</p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="hidden sm:block">M. Adebayo</span>
          <span className="grid h-10 w-10 place-items-center rounded-full bg-[#a55338]">
            MA
          </span>
        </div>
      </header>
      <div className="grid lg:grid-cols-[220px_1fr]">
        <aside className="border-r bg-white p-4 lg:min-h-[calc(100vh-5rem)]">
          <nav className="flex gap-2 overflow-x-auto lg:flex-col">
            {['Overview', 'Reservations', 'Inventory', 'Pricing'].map((x) => (
              <button
                key={x}
                onClick={() => setTab(x)}
                className={`whitespace-nowrap px-4 py-3 text-left text-sm ${tab === x ? 'bg-[#e2e8e1] font-semibold text-[#21412d]' : 'text-[#687069]'}`}
              >
                {x}
              </button>
            ))}
          </nav>
          <div className="mt-8 hidden border-t pt-5 text-xs text-[#777] lg:block">
            <p>Demo operations UI</p>
            <p className="mt-2">Changes are not persisted.</p>
          </div>
        </aside>
        <section className="min-w-0 p-5 lg:p-8">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs uppercase tracking-[.14em] text-[#7a817b]">
                Monday, 31 August
              </p>
              <h1 className="mt-2 font-serif text-4xl">{tab}</h1>
            </div>
            <button
              onClick={() => setTab('Inventory')}
              className="flex h-11 items-center gap-2 bg-[#1c2c25] px-4 text-xs uppercase tracking-[.12em] text-white"
            >
              <Settings2 size={16} /> Room settings
            </button>
          </div>
          {tab === 'Overview' && (
            <>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map(([l, v, n, I]) => (
                  <div key={l} className="border bg-white p-5">
                    <I className="text-[#a55338]" size={21} />
                    <p className="mt-7 text-xs uppercase tracking-[.13em] text-[#777]">
                      {l}
                    </p>
                    <p className="mt-2 font-serif text-3xl">{v}</p>
                    <p className="mt-1 text-xs text-[#7a817b]">{n}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 grid gap-5 xl:grid-cols-[1.5fr_.8fr]">
                <div className="border bg-white p-5">
                  <div className="flex flex-col gap-1 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
                    <h2 className="font-serif text-2xl">Today’s movement</h2>
                    <span className="text-xs text-[#777]">
                      8 arrivals · 6 departures
                    </span>
                  </div>
                  <div className="mt-5 space-y-3">
                    {reservations.slice(0, 3).map((r) => (
                      <div
                        key={r.ref}
                        className="flex flex-wrap items-center justify-between gap-3 border-t pt-3 text-sm"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#e4e9e2]">
                            <Users size={16} />
                          </span>
                          <span className="min-w-0">
                            <b>{r.guest}</b>
                            <span className="block text-xs text-[#777]">
                              {r.room}
                            </span>
                          </span>
                        </div>
                        <span className="text-xs">{r.status}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border bg-[#21342c] p-5 text-white">
                  <p className="text-xs uppercase tracking-[.14em] text-white/50">
                    House status
                  </p>
                  <p className="mt-5 font-serif text-4xl">29 / 38</p>
                  <p className="text-sm text-white/60">
                    rooms occupied tonight
                  </p>
                  <div className="mt-7 flex h-3 overflow-hidden">
                    <span className="w-[76%] bg-[#d39a76]" />
                    <span className="w-[16%] bg-[#d8e0d5]" />
                    <span className="flex-1 bg-[#8c5242]" />
                  </div>
                  <div className="mt-4 flex justify-between text-[10px] text-white/60">
                    <span>Occupied 76%</span>
                    <span>Service 8%</span>
                  </div>
                </div>
              </div>
            </>
          )}
          {tab === 'Reservations' && (
            <div className="mt-8 border bg-white">
              <div className="flex items-center gap-3 border-b p-4">
                <Search size={18} />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search guest, reference or room"
                  className="h-10 max-w-md rounded-none"
                />
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Guest</TableHead>
                    <TableHead>Room</TableHead>
                    <TableHead>Stay</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((r) => (
                    <TableRow key={r.ref}>
                      <TableCell className="font-mono text-xs">
                        {r.ref}
                      </TableCell>
                      <TableCell className="font-medium">{r.guest}</TableCell>
                      <TableCell>{r.room}</TableCell>
                      <TableCell>
                        {r.arrival} → {r.departure}
                      </TableCell>
                      <TableCell>
                        <span className="bg-[#e4ebe2] px-2 py-1 text-xs">
                          {r.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">{r.total}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              {!filtered.length && (
                <p className="p-10 text-center text-sm text-[#777]">
                  No reservations match “{query}”.
                </p>
              )}
            </div>
          )}
          {tab === 'Inventory' && (
            <div className="mt-8 grid gap-4 lg:grid-cols-2">
              {inventory.map((r) => (
                <div
                  key={r.slug}
                  className="flex flex-col items-stretch gap-4 border bg-white p-5 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between"
                >
                  <div>
                    <p className="font-medium">{r.name}</p>
                    <p className="mt-1 text-xs text-[#777]">
                      {r.category} · {r.size} m²
                    </p>
                  </div>
                  <select
                    aria-label={`${r.name} status`}
                    value={r.status}
                    onChange={(e) =>
                      setInventory((s) =>
                        s.map((x) =>
                          x.slug === r.slug
                            ? { ...x, status: e.target.value }
                            : x,
                        ),
                      )
                    }
                    className="h-11 w-full min-w-0 border bg-transparent p-2 text-base min-[420px]:w-auto min-[420px]:text-sm"
                  >
                    <option>Available</option>
                    <option>Reserved</option>
                    <option>Occupied</option>
                    <option>Cleaning</option>
                    <option>Maintenance</option>
                  </select>
                </div>
              ))}
            </div>
          )}
          {tab === 'Pricing' && (
            <div className="mt-8 border bg-white p-5">
              <p className="mb-5 text-sm text-[#666]">
                Demo rate controls. Values reset when the page reloads.
              </p>
              {rooms.map((r) => (
                <div
                  key={r.slug}
                  className="grid items-center gap-3 border-t py-4 sm:grid-cols-[1fr_160px_120px]"
                >
                  <div>
                    <b>{r.name}</b>
                    <p className="text-xs text-[#777]">Flexible public rate</p>
                  </div>
                  <Input
                    aria-label={`${r.name} nightly rate`}
                    type="number"
                    min={1}
                    value={rates[r.slug]}
                    onChange={(e) =>
                      setRates((current) => ({
                        ...current,
                        [r.slug]: Number(e.target.value),
                      }))
                    }
                    className="h-10 rounded-none"
                  />
                  <button
                    onClick={() => setSavedRate(r.slug)}
                    className="h-10 border text-xs uppercase tracking-[.12em]"
                  >
                    {savedRate === r.slug ? 'Saved locally' : 'Update rate'}
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
