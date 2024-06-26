import * as React from 'react';

import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startContent?: React.ReactElement;
  endContent?: React.ReactElement;
  startContentAction?: () => void;
  endContentAction?: () => void;
  error?: boolean;
}

const startIconPadding = 'pl-6'; // Default padding when only StartIcon is present
const endIconPadding = 'pr-6'; // Additional padding when only EndIcon is present
const bothIconsPadding = 'pl-6 pr-6'; // Padding when both StartIcon and EndIcon are present

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, startContent, endContent, error, ...props }, ref) => {
    const combinedPadding =
      startContent && endContent
        ? bothIconsPadding
        : startContent
        ? startIconPadding
        : endContent
        ? endIconPadding
        : '';
    return (
      <div
        className={cn(
          'bg-[#F3F7FE] flex items-center h-max w-full rounded-xl border border-input bg-background text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-[#484851] focus-within:outline-none disabled:cursor-not-allowed disabled:opacity-50',
          className,
          combinedPadding,
          {
            ' border-red-600 focus-visible:ring-red-500 bg-[#F3F7FE] focus-within:ring-destructive':
              error,
          }
        )}
      >
        {startContent}
        <input
          type={type}
          className="flex-grow h-full w-full rounded-xl px-5 py-4 focus-within:outline-none focus-within:ring-transparent placeholder:text-sm"
          ref={ref}
          {...props}
        />
        {endContent}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
