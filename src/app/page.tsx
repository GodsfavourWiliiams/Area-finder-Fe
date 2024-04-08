import HomePage from '@/components/pages/Home';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Landing page',
};
export default function Home() {
  return <HomePage />;
}
