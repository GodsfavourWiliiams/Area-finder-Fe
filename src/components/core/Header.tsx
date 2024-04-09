'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { AppLogo } from '../ui/AppLogo';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Input } from '../ui/input';

const Header = () => {
  const pathname = usePathname();

  if (pathname === '/review') {
    return (
      <nav className="z-50 relative">
        <div className="flex items-center justify-between py-4 w-full">
          <div className="flex lg:flex-1 items-center gap-x-12">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Spotta hd Logo</span>
              <AppLogo />
            </Link>
            <Input
              className="hidden md:flex rounded-lg w-full max-w-[778px]"
              startContent={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.4074 12.1482C10.0256 12.1482 12.1481 10.0257 12.1481 7.40743C12.1481 4.78919 10.0256 2.66669 7.4074 2.66669C4.78916 2.66669 2.66666 4.78919 2.66666 7.40743C2.66666 10.0257 4.78916 12.1482 7.4074 12.1482Z"
                    stroke="#3366FF"
                    strokeWidth="1.18519"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M13.333 13.333L10.7552 10.7552"
                    stroke="#0D2159"
                    strokeWidth="1.18519"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              endContent={
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 4L4 12"
                    stroke="#0D2159"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M4 4L12 12"
                    stroke="#0D2159"
                    strokeWidth="1.33333"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              }
              placeholder="Bonny and Clyde Street, Ajao Estate, Lagos"
            />
          </div>
          <div className={cn('gap-4 items-center flex')}>
            <span>Welcome!</span>
            <Image
              className="h-[36px] w-[36px] rounded-full"
              width={16}
              height={16}
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt=""
            />
          </div>
        </div>
        <Input
          className="flex md:hidden rounded-lg w-full max-w-[778px]"
          startContent={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.4074 12.1482C10.0256 12.1482 12.1481 10.0257 12.1481 7.40743C12.1481 4.78919 10.0256 2.66669 7.4074 2.66669C4.78916 2.66669 2.66666 4.78919 2.66666 7.40743C2.66666 10.0257 4.78916 12.1482 7.4074 12.1482Z"
                stroke="#3366FF"
                strokeWidth="1.18519"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M13.333 13.333L10.7552 10.7552"
                stroke="#0D2159"
                strokeWidth="1.18519"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          endContent={
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 4L4 12"
                stroke="#0D2159"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M4 4L12 12"
                stroke="#0D2159"
                strokeWidth="1.33333"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          placeholder="Bonny and Clyde Street, Ajao Estate, Lagos"
        />
      </nav>
    );
  }
  return (
    <nav className="z-50 relative">
      <div className="flex items-center justify-between py-4 w-full">
        <div className="flex lg:flex-1 items-center gap-x-12">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Spotta hd Logo</span>
            <AppLogo background="dark" />
          </Link>
        </div>
        <Link href="/review" className={cn('gap-4 items-center flex')}>
          <span>Review!</span>
          <Image
            className="h-[36px] w-[36px] rounded-full"
            width={16}
            height={16}
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
          />
        </Link>
      </div>
    </nav>
  );
};

export default Header;
