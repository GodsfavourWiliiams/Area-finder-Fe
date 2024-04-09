import { Icons } from '@/assets/icons';
import React, { useEffect, useRef, useState } from 'react';

type Props = {
  hideArrow?: boolean;
  children: React.ReactNode;
  className?: string;
  height?: number;
  isJustify?: boolean;
};

const Carousel = (props: Props) => {
  const { height = 262, isJustify = false } = props;
  const [showNavButton, setShowNavButton] = useState({
    left: false,
    right: true,
  });
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState<boolean>(false); // New state for dragging
  const [dragStartX, setDragStartX] = useState<number>(0);
  const [scrollLeft, setScrollLeft] = useState<number>(0);
  const [hasOverflow, setHasOverflow] = useState<boolean>(false);

  useEffect(() => {
    const onScroll = () => {
      if (!sliderRef.current) return;

      const isAtEnd =
        sliderRef.current.scrollLeft + sliderRef.current.clientWidth >=
        sliderRef.current.scrollWidth - 1;
      const isAtStart = sliderRef.current.scrollLeft === 0;

      setShowNavButton({ left: !isAtStart, right: !isAtEnd });
    };

    if (sliderRef.current) {
      sliderRef.current.addEventListener('scroll', onScroll);
    }

    return () => {
      if (sliderRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        sliderRef.current.removeEventListener('scroll', onScroll);
      }
    };
  }, []);

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    const event = e as unknown as MouseEvent;
    setIsDragging(true);
    sliderRef.current?.classList.add('active');
    setDragStartX(event.clientX - (sliderRef.current?.offsetLeft || 0));
    setScrollLeft(sliderRef.current?.scrollLeft || 0);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    sliderRef.current?.classList.remove('active');
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.clientX - (sliderRef.current?.offsetLeft || 0);
    const deltaX = x - dragStartX;

    // If the drag threshold is reached, set hasDragged to true
    if (!isDragging && Math.abs(deltaX) >= 4) {
      setIsDragging(true);
    }

    const walk = deltaX * 3; // Adjust scroll-fast as needed
    if (sliderRef.current) {
      sliderRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDragging, dragStartX, scrollLeft]);

  const scrollToLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: -sliderRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  const scrollToRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({
        left: sliderRef.current.offsetWidth,
        behavior: 'smooth',
      });
    }
  };

  // Inside your Carousel component

  const checkForOverflow = () => {
    if (sliderRef.current) {
      const hasOverflow =
        sliderRef.current.scrollWidth > sliderRef.current.clientWidth;

      // Use the `hasOverflow` value as needed
      if (hasOverflow) {
        // Do something when there is overflow
        setHasOverflow(true);
      } else {
        // Do something when there is no overflow
        setHasOverflow(false);
      }
    }
  };

  // Run `checkForOverflow` whenever the screen width changes or the carousel rerenders
  useEffect(() => {
    checkForOverflow();

    // Add window resize event listener
    const handleResize = () => {
      checkForOverflow();
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sliderRef.current, props.children]); // Add dependencies here as needed
  // ...

  return (
    <div
      className={`relative flex justify-center item-center gap-3 ${props.className} `}
    >
      {!props.hideArrow && hasOverflow && (
        <NavButton
          direction="left"
          onClick={scrollToLeft}
          visible={showNavButton}
        />
      )}

      <div
        className={`w-full flex ${
          isJustify ? 'justify-between' : 'justify-start'
        } overflow-x-auto [&::-webkit-scrollbar]:hidden gap-4 relative ${
          isDragging ? 'no-pointer-events' : ''
        }`}
        ref={sliderRef}
        onMouseDown={handleMouseDown}
      >
        {props.children}
      </div>
      {hasOverflow && showNavButton.right && (
        <div
          className={`        
            absolute z-30 top-0 -right-3
         `}
        >
          <svg
            width="80"
            className="rounded-xl"
            height="0"
            viewBox="0 0 80 262"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="231"
              height={height}
              fill="url(#paint0_linear_5721_87503)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_5721_87503"
                x1="66.3646"
                y1="131"
                x2="14.0387"
                y2="131"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#FCFCFC" />
                <stop offset="1" stopColor="#FCFCFC" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      )}
      {!props.hideArrow && hasOverflow && (
        <>
          <NavButton
            direction="right"
            onClick={scrollToRight}
            visible={showNavButton}
          />
        </>
      )}
    </div>
  );
};

export default Carousel;

function NavButton({
  direction,
  onClick,
  visible,
}: {
  direction: 'left' | 'right';
  onClick: () => void;
  visible: { left: boolean; right: boolean };
}) {
  const isLeft = direction === 'left';

  return (
    <button
      className={`hidden sm:block z-40 transition duration-100 rounded-full p-2 border bg-white border-gray-300`}
      onClick={onClick}
    >
      {isLeft ? (
        <Icons.ArrowPrevIcon className="text-black w-4 h-4" />
      ) : (
        <Icons.ArrowPrevIcon className="text-black rotate-180 w-4 h-4" />
      )}
    </button>
  );
}
