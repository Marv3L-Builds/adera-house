import { Header } from '@/components/site-shell';
import { BookingFlow } from '@/components/booking-flow';

export default async function Booking({ searchParams }: { searchParams: Promise<{ room?: string }> }) {
  const { room } = await searchParams;
  return <main><Header/><BookingFlow initialRoom={room}/></main>;
}
