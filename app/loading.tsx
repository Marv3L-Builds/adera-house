export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f4f0e8]" aria-busy="true" aria-label="Loading Adera House">
      <div className="h-24 border-b border-[#18231f]/15 px-5 sm:px-10 lg:px-16"><div className="flex h-full items-center"><span className="h-9 w-40 animate-pulse bg-[#ddd6ca]" /></div></div>
      <div className="px-5 py-16 sm:px-10 lg:px-16"><span className="block h-3 w-32 animate-pulse bg-[#d8d1c6]" /><span className="mt-6 block h-16 max-w-2xl animate-pulse bg-[#d8d1c6]" /><span className="mt-10 block aspect-[16/7] w-full animate-pulse bg-[#d8d1c6]" /></div>
      <p className="sr-only">Preparing your stay</p>
    </main>
  );
}
