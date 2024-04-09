'use client';

import React, { useEffect, useState } from 'react';
import ReviewHero from './ReviewHero';
import ReviewCard, { IReview } from './ReviewCard';
import { AppContainer } from '@/components/core/AppContainer';
import Image from 'next/image';
import { Icons } from '@/assets/icons';
import { Button } from '@/components/ui/button';
import useDisclosure from '@/hooks/useDisclosure';

const ReviewPage = () => {
  const [reviews, setReviews] = useState<IReview[]>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const storedData = window.sessionStorage.getItem('reviews');
    if (storedData) {
      setReviews(JSON.parse(storedData));
    }
    if (formSubmitted) {
      setFormSubmitted(false);
    }
  }, [formSubmitted]);

  const images = ['image1.jpg', 'image2.png', 'image3.png', 'image4.jpg'];

  if (reviews && reviews?.length === 0) {
    return (
      <div className="flex flex-col gap-4">
        <ReviewHero
          setFormSubmitted={setFormSubmitted}
          isReview={reviews && reviews?.length > 0}
          onOpen={onOpen}
          isOpen={isOpen}
          onClose={onClose}
        />
        <div className="flex flex-col gap-4 max-w-sm w-full mx-auto items-center justify-center mt-10">
          <Icons.EmptyState />
          <span>Oops! No reviews yet.</span>
          <Button onClick={onOpen} className="uppercase w-fit">
            Leave a review
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ReviewHero
        setFormSubmitted={setFormSubmitted}
        isReview={reviews && reviews?.length > 0}
        onOpen={onOpen}
        isOpen={isOpen}
        onClose={onClose}
      />
      <AppContainer>
        {' '}
        <div className="mx-auto flex flex-col lg:flex-row items-start gap-x-8 gap-y-16 py-6 w-full overflow-hidden">
          <div className="w-full flex flex-col order-2 lg:order-1">
            {reviews &&
              reviews?.length > 0 &&
              reviews?.map((item: any, index: number) => (
                <ReviewCard review={item} key={index} />
              ))}
          </div>

          <div className="columns-3 sm:grid sm:grid-cols-2 gap-4 sm:w-full sm:max-w-[488px] order-1 lg:order-2 overflow-scroll">
            {images?.map((image: string, index: number) => (
              <div
                className="relative w-52 sm:w-[235px] sm:h-[224px] h-auto"
                key={index}
              >
                <Image
                  src={image}
                  alt="Walnut card tray with white powder coated steel divider and 3 punchout holes."
                  className="rounded-lg bg-gray-100 w-full h-full object-cover mb-4"
                  width={235}
                  height={224}
                  unoptimized
                />
                {index === 3 && (
                  <div className="absolute bg-[#565656]/80 top-0 w-full sm:h-[224px] h-full rounded-lg flex items-center justify-center cursor-pointer">
                    <span className="text-white">VIEW MORE</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>{' '}
      </AppContainer>
    </div>
  );
};

export default ReviewPage;
