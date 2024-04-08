import React from 'react';
import { AppContainer } from '../core/AppContainer';
import Image from 'next/image';
import Header from '../core/Header';
import { Input } from '../ui/input';

const HomePage = () => {
  return (
    <AppContainer className="relative">
      {' '}
      <Header />
      <div className="w-full flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-10 h-[924px]">
        <div className="sm:max-w-lg flex flex-col gap-4">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Find a place you will love to live!
          </h1>
          <p className="mt-4 text-lg sm:text-2xl text-[#1E1E1E]">
            See through the lenses of people who have lived or visited the
            neighbourhood you might have in mind.
          </p>
          <Input
            startContent={
              <svg
                width="12"
                height="13"
                viewBox="0 0 12 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.40743 10.6481C8.02567 10.6481 10.1482 8.52565 10.1482 5.90741C10.1482 3.28917 8.02567 1.16666 5.40743 1.16666C2.78919 1.16666 0.666687 3.28917 0.666687 5.90741C0.666687 8.52565 2.78919 10.6481 5.40743 10.6481Z"
                  stroke="#0D2159"
                  stroke-width="1.18519"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M11.333 11.833L8.75519 9.2552"
                  stroke="#0D2159"
                  stroke-width="1.18519"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            }
            placeholder="Enter Address"
          />
          <button className="uppercase inline-block w-fit rounded-md border border-transparent bg-[#3366FF] px-8 py-3 text-center text-white hover:bg-[#3366FF]/80">
            Search
          </button>
        </div>
        <div className="mt-10 hidden sm:block">
          <div
            aria-hidden="true"
            className="pointer-events-none lg:absolute lg:inset-y-0 right-0 -z-10"
          >
            <div className="h-full w-full sm:opacity-0 lg:opacity-100">
              <Image
                src="/herobg.jpg"
                width={506}
                height={1024}
                unoptimized={true}
                alt="hero bg"
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>
    </AppContainer>
  );
};

export default HomePage;
