import React from 'react';
import Image from 'next/image';
import { Icons } from '@/assets/icons';

export interface IReview {
  name: string;
  img: string;
  createdAt: string;
  body: string;
  likes: number;
  comments: number;
  dislikes: number;
  rate: number;
}

type Props = {
  review: IReview;
};

const ReviewCard = (props: Props) => {
  const { review } = props;

  function formatLastUpdated() {
    const date = new Date(review?.createdAt);

    // Get the current date and time
    const now = new Date();

    // Calculate the time difference in milliseconds
    const timeDifference: number = now.getTime() - date.getTime();

    // Calculate the time difference in days
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    // Check if the date is from today
    if (daysDifference === 0) {
      // Format the time in HH:mm AM/PM
      const formattedTime = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
      });

      return `${formattedTime}`;
    } else if (daysDifference === 1) {
      return 'Yesterday';
    } else if (daysDifference < 7) {
      // Format the day of the week
      const formattedDay = date.toLocaleDateString('en-US', {
        weekday: 'long',
      });

      return formattedDay;
    } else {
      // Format the date in the format "MMM DD"
      const formattedDate = date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });

      return formattedDate;
    }
  }
  return (
    <article className="text-base bg-white py-4 border-b">
      <div className="flex flex-col items-start self-end gap-2 mt-2">
        <div className="flex items-center justify-between gap-4 w-full">
          <div className="flex items-center gap-4">
            <Image
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              className="h-[24px] w-[24px] bg-zinc-50 rounded-full"
              width={10}
              height={10}
              unoptimized
              alt="Michael Gough"
            />
            <p className="text-xs text-grey-300 ">{review?.name}</p>
            <span className="text-xs text-[#767777]">
              {formatLastUpdated()}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Icons.Rate />
            <span className="text-xs text-[#1E1E1E]">{review?.rate}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-base text-[#18181B] wrap-review max-w-[920px] text-justify">
            {review?.body}
          </p>
        </div>
      </div>

      {/* card footer */}
      <div className="flex items-center gap-4 text-[#0D2159] mt-3">
        <div className="flex items-center gap-1 text-[#0D2159]">
          <Icons.Like />
          <span className="text-sm">1224</span>
        </div>
        <div className="flex items-center gap-1 text-[#0D2159]">
          <Icons.DisLike />
          <span className="text-sm">4</span>
        </div>
        <div className="flex items-center gap-1 text-[#0D2159] ml-5">
          <Icons.Comments />
          <span className="text-sm">24</span>
        </div>
      </div>
    </article>
  );
};

export default ReviewCard;
