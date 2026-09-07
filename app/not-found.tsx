import { ArrowLeft } from 'lucide-react';
import { Header, Footer } from '@/components/site-shell';

export default function NotFound() {
  return <main><Header/><section className="grid min-h-[65vh] place-items-center px-5 py-20 text-center"><div><p className="eyebrow">404 · Room not found</p><h1 className="mt-5 font-serif text-6xl sm:text-8xl">This door doesn’t open.</h1><p className="mx-auto mt-5 max-w-lg leading-7 text-[#62675f]">The page may have moved, or this room is no longer in our collection.</p><a href="/rooms" className="mt-8 inline-flex items-center gap-3 bg-[#18231f] px-6 py-4 text-xs font-bold uppercase tracking-[.15em] text-white"><ArrowLeft size={16}/> Explore all rooms</a></div></section><Footer/></main>;
}
