import { ArrowUpRight, BedDouble, Maximize2, Users } from 'lucide-react';
import { money, type Room } from '@/lib/hotel-data';
import { HotelImage } from '@/components/hotel-image';

export function RoomCard({ room }: { room: Room }) {
  return (
    <article className="group">
      <a href={`/rooms/${room.slug}`} className="relative block aspect-[4/3] overflow-hidden bg-[#ded8ce]">
        <HotelImage
          src={room.images[0]}
          alt={`${room.name} interior`}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-full w-full"
          imageClassName="h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
        />
        <span className={`absolute left-4 top-4 px-3 py-2 text-[10px] font-bold uppercase tracking-[.14em] ${room.available ? 'bg-[#edf1e8] text-[#314530]' : 'bg-[#ece4de] text-[#7a3d2d]'}`}>
          {room.available ? 'Available' : 'Next available 3 Sep'}
        </span>
        <span className="absolute bottom-4 right-4 grid h-11 w-11 place-items-center bg-white text-[#18231f]"><ArrowUpRight size={18} /></span>
      </a>
      <div className="border-b border-[#18231f]/20 py-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
          <h3 className="font-serif text-3xl">{room.name}</h3>
          <p className="text-sm"><b>{money(room.price)}</b> / night</p>
        </div>
        <p className="mt-3 line-clamp-2 text-sm leading-6 text-[#5f665f]">{room.description}</p>
        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-[#5f665f]">
          <span className="flex gap-2"><Users size={15} />{room.guests} guests</span>
          <span className="flex gap-2"><BedDouble size={15} />{room.bed}</span>
          <span className="flex gap-2"><Maximize2 size={15} />{room.size} m²</span>
        </div>
      </div>
    </article>
  );
}
