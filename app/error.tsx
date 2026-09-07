'use client';

import { AlertTriangle, RotateCcw } from 'lucide-react';

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#17221f] px-5 text-center text-white">
      <div className="max-w-xl"><AlertTriangle className="mx-auto text-[#d0a58e]" size={32} /><p className="mt-6 text-xs uppercase tracking-[.2em] text-[#d0a58e]">A temporary interruption</p><h1 className="mt-4 font-serif text-5xl sm:text-7xl">Let’s try that again.</h1><p className="mt-5 leading-7 text-white/65">This part of the house could not be prepared. Your information has not been submitted.</p><button onClick={reset} className="mt-8 inline-flex h-12 items-center gap-3 bg-white px-6 text-xs font-bold uppercase tracking-[.15em] text-[#17221f]"><RotateCcw size={16}/> Try again</button></div>
    </main>
  );
}
