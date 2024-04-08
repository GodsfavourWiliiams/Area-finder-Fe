'use client';

import { cn } from '@/lib/utils';
import Link from 'next/link';
import { AppContainer } from './AppContainer';
import { AppLogo } from '../ui/AppLogo';
import Image from 'next/image';

const Header = () => {
  return (
    <nav className="z-50 relative">
      <div className="flex items-center justify-between py-4 w-full">
        <div className="flex lg:flex-1 items-center gap-x-12">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Spotta hd Logo</span>
            <AppLogo background="dark" />
          </Link>
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
    </nav>
  );
};

export default Header;
