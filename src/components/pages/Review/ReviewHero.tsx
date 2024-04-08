import { AppContainer } from '@/components/core/AppContainer';
import { ReviewContainer } from '@/components/core/ReviewContainer';

export default function ReviewHero() {
  return (
    <ReviewContainer>
      <AppContainer className="py-10 flex items-start flex-col gap-10">
        <div className="sm:max-w-4xl flex flex-col gap-5">
          <h1 className="sm:text-[36px] text-3xl font-bold tracking-tight leading-[139.13%]">
            Welcome back <br className="block sm:hidden" /> to QuestionTime!
          </h1>
          <p className="font-normal text-sm sm:text-base leading-[160%] text-[#B9BABE]">
            Share your inquiries, and embark on a journey of enlightenment.
            Create questions and let your questions resonate across the pages of
            curiosity!
          </p>
        </div>
      </AppContainer>
    </ReviewContainer>
  );
}
