export type Room = { slug:string; name:string; category:string; price:number; guests:number; bed:string; size:number; available:boolean; description:string; amenities:string[]; images:string[] };

const u = (id:string, w=1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=86`;

export const rooms: Room[] = [
  { slug:'lagoon-studio', name:'Lagoon Studio', category:'Studio', price:185000, guests:2, bed:'King bed', size:42, available:true, description:'A quiet, light-filled retreat with hand-finished oak, woven details and a framed view over Five Cowries Creek.', amenities:['Lagoon view','Rain shower','Breakfast included','Nespresso','Smart room controls'], images:[u('photo-1618773928121-c32242e63f39'),u('photo-1590490360182-c33d57733427'),u('photo-1584132967334-10e028bd69f7')] },
  { slug:'aderin-suite', name:'Aderin Suite', category:'Suite', price:295000, guests:3, bed:'Super king bed', size:68, available:true, description:'An elegant one-bedroom suite shaped for long, unhurried stays, with a separate salon and an expansive waterfront terrace.', amenities:['Private terrace','Deep soaking tub','Butler service','Complimentary minibar','Lounge'], images:[u('photo-1600607687939-ce8a6c25118c'),u('photo-1600210492486-724fe5c67fb0'),u('photo-1600566753190-17f0baa2a6c3')] },
  { slug:'eko-corner', name:'Eko Corner Room', category:'Room', price:228000, guests:2, bed:'King bed', size:51, available:false, description:'A dual-aspect corner room where the skyline and lagoon meet, grounded by tactile Nigerian textiles and local art.', amenities:['Corner view','Walk-in wardrobe','Rain shower','Workspace','Evening turndown'], images:[u('photo-1611892440504-42a792e24d32'),u('photo-1566665797739-1674de7a421a'),u('photo-1598928506311-c55ded91a20c')] },
  { slug:'ire-penthouse', name:'Ire Penthouse', category:'Penthouse', price:680000, guests:4, bed:'Two king bedrooms', size:142, available:true, description:'Our most private residence: two serene bedrooms, a generous living room and a terrace made for sunset dinners above Lagos.', amenities:['Two bedrooms','Host service','Private dining','Panoramic terrace','Airport transfer'], images:[u('photo-1600607687920-4e2a09cf159d'),u('photo-1600210491892-03d54c0aaf87'),u('photo-1600566753086-00f18fb6b3ea')] },
];

export const experiences = [
  { title:'Oro Dining Room', eyebrow:'Nigerian, reimagined', image:u('photo-1414235077428-338989a2e8c0'), copy:'A produce-led menu that travels from the coast to the savannah, served with warmth and restraint.' },
  { title:'The Waterline', eyebrow:'Pool & sunset terrace', image:u('photo-1571896349842-33c89424de2d'), copy:'Long afternoons, quiet swims and small plates beside the lagoon.' },
  { title:'Ayo House Spa', eyebrow:'Restorative rituals', image:u('photo-1540555700478-4be289fbecef'), copy:'Contemporary treatments rooted in West African botanicals and restorative touch.' },
];

export const reviews = [
  { quote:'The rare Lagos stay that feels deeply connected to the city and completely removed from its rush.', name:'Amaka O.', stay:'Aderin Suite · May 2026' },
  { quote:'Every detail felt considered—from the welcome tea to the quiet of the terrace at sunrise.', name:'Tunde A.', stay:'Lagoon Studio · April 2026' },
];

export const reservations = [
  { ref:'ADH-24081', guest:'Adaeze Okafor', room:'Aderin Suite', arrival:'29 Aug', departure:'01 Sep', status:'Arriving', total:'₦885,000' },
  { ref:'ADH-24077', guest:'Femi Cole', room:'Lagoon Studio', arrival:'28 Aug', departure:'30 Aug', status:'In house', total:'₦370,000' },
  { ref:'ADH-24069', guest:'Zainab Bello', room:'Eko Corner Room', arrival:'30 Aug', departure:'03 Sep', status:'Confirmed', total:'₦912,000' },
  { ref:'ADH-24055', guest:'Kelechi Nwosu', room:'Ire Penthouse', arrival:'31 Aug', departure:'02 Sep', status:'Confirmed', total:'₦1,360,000' },
];

export const money = (value:number) => `₦${value.toLocaleString('en-NG')}`;
