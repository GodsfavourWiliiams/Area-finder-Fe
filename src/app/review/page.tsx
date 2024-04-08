import ReviewPage from '@/components/pages/Review';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Review',
  description: 'Review page',
};
export default function Review() {
  return <ReviewPage />;
}
