import { cn } from '@/lib/utils';
import { FC } from 'react';

type ReviewContainerProps = {
  children: React.ReactNode;
  className?: string;
};

export const ReviewContainer: FC<ReviewContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn('h-[195px] bg-[#F2F6FD]', className)}>{children}</div>
  );
};
