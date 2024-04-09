'use client';

import { Icons } from '@/assets/icons';
import { AppContainer } from '@/components/core/AppContainer';
import Header from '@/components/core/Header';
import { ReviewContainer } from '@/components/core/ReviewContainer';
import Carousel from '@/components/core/Swipper';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import useDisclosure from '@/hooks/useDisclosure';
import { cn } from '@/lib/utils';
import { useForm, useWatch } from 'react-hook-form';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useEffect, useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { IReview } from './ReviewCard';

export interface FormData {
  review: string;
  rating: string;
  amenities: { [key: string]: Object }[];
  as_anonymous: boolean;
}

interface Props {
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
  isReview: boolean;
  setFormSubmitted: (formSubmitted: boolean) => void;
}

export default function ReviewHero({
  setFormSubmitted,
  onOpen,
  isOpen,
  onClose,
  isReview,
}: Props) {
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [submitButtonDisabled, setSubmitButtonDisabled] =
    useState<boolean>(true);
  useEffect(() => {
    // Load reviews from session storage when the component mounts
    const storedReviews = sessionStorage.getItem('reviews');
    if (storedReviews) {
      setReviews(JSON.parse(storedReviews));
    }
  }, []); // Empty dependency array ensures this effect runs only once on mount

  let data: { [key: string]: Object }[] = [
    { id: 1, name: 'Parking Lot' },
    { id: 2, name: 'Free Wi-Fi' },
    { id: 3, name: 'Parking Lot' },
    { id: 4, name: 'Free Wi-Fi' },
    { id: 5, name: 'Parking Lot' },
    { id: 6, name: 'Nightlife' },
    { id: 7, name: 'Pet Store' },
    { id: 8, name: 'Nightlife' },
    { id: 9, name: 'Pet Store' },
    { id: 10, name: 'Nightlife' },
    { id: 11, name: 'Hospitals' },
    { id: 12, name: 'Childcare' },
    { id: 13, name: 'Hospitals' },
    { id: 14, name: 'Childcare' },
    { id: 15, name: 'Hospitals' },
    { id: 16, name: 'Adult Home' },
    { id: 17, name: 'Gym' },
    { id: 18, name: 'Adult Home' },
    { id: 19, name: 'Gym' },
    { id: 20, name: 'Adult Home' },
    { id: 21, name: 'Schools' },
    { id: 22, name: 'Security' },
    { id: 23, name: 'Schools' },
    { id: 24, name: 'Security' },
    { id: 25, name: 'Schools' },
  ];
  // Create a set to keep track of unique names
  let uniqueNames = new Set();

  // Filter out duplicates from data array
  let uniqueData = data.filter((item) => {
    if (!uniqueNames.has(item.name)) {
      uniqueNames.add(item.name);
      return true;
    }
    return false;
  });

  const locations = [
    'Schools',
    'Hospitals',
    'Resort Park',
    'Shopping Malls',
    'Airport',
    'Train Station',
    'Nightlife',
    'Public Wifi',
    'Parking Lot',
    'Security',
    'Public Transport',
    'Bus Station',
    'Quiet',
  ];

  const DefaultValues: FormData = {
    review: '',
    rating: '',
    amenities: [],
    as_anonymous: false,
  };
  const form = useForm({
    defaultValues: DefaultValues,
  });

  const {
    formState: { errors },
    control,
    setValue,
    reset,
  } = form;

  const amenities = useWatch({ control, name: 'amenities' });
  const ratings = useWatch({ control, name: 'rating' });
  const review = useWatch({ control, name: 'review' });

  useEffect(() => {
    // Check if amenities has values
    if (
      Object.keys(amenities).filter((key: any) => amenities[key]).length ===
        0 ||
      ratings == '' ||
      review === ''
    ) {
      setSubmitButtonDisabled(true); // Enable submit button
    } else {
      setSubmitButtonDisabled(false); // Disable submit button
    }
  }, [amenities, ratings, review]);

  const handleStarClick = (index: number) => {
    setRating(index + 1);
    setValue('rating', String(index + 1));
  };
  const currentDate = new Date();
  const onSubmit = () => {
    form.handleSubmit((data: any) => {
      const newReview: IReview = {
        name: 'Michael Gough',
        likes: 20,
        comments: 2,
        dislikes: 5,
        img: data.img,
        createdAt: currentDate.toISOString(), // Capture the current timestamp,
        body: data.review,
        rate: parseInt(data.rating) + 0.0, // Convert rating to number
      };

      // Append the new review to the existing reviews array
      const updatedReviews = [...reviews, newReview];
      setReviews(updatedReviews);

      // Store the updated reviews array in session storage
      sessionStorage.setItem('reviews', JSON.stringify(updatedReviews));

      // Reset the form after successful submission
      reset(DefaultValues);
      setRating(0);

      // Trigger the re-render to check session storage
      setFormSubmitted(true);
    })();
  };

  return (
    <>
      <ReviewContainer>
        <AppContainer className="flex flex-col gap-4 md:gap-0 pb-4">
          <Header />
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center gap-4">
              <div className="flex flex-col gap-3">
                <h1 className="text-lg sm:text-2xl font-medium text-[#1E1E1E]">
                  Bonny and Clyde Street, Ajao Estate, Lagos
                </h1>
                <p className="font-normal text-sm sm:text-base text-[#18181B]">
                  “450” Reviews (People are raving about the selected location)
                </p>
              </div>
              {isReview && (
                <div className="hidden items-center gap-4 lg:flex">
                  <Button onClick={onOpen} className="uppercase">
                    Leave a review
                  </Button>
                  <Button variant={'outline'}>
                    <Icons.Save />
                  </Button>
                  <Button variant={'outline'}>
                    <Icons.Share />
                  </Button>
                </div>
              )}
            </div>

            <Carousel>
              {' '}
              {locations?.map((item: any, index: number) => (
                <span
                  key={index}
                  className="flex-shrink-0 text-sm text-[#1E1E1E] border-[1px] border-[#1E1E1E] bg-white rounded-lg px-2 py-1.5"
                >
                  {item}
                </span>
              ))}
            </Carousel>
            {isReview && (
              <div className="flex items-center gap-4 lg:hidden">
                <Button onClick={onOpen} className="uppercase">
                  Leave a review
                </Button>
                <Button variant={'outline'}>
                  <Icons.Save />
                </Button>
                <Button variant={'outline'}>
                  <Icons.Share />
                </Button>
              </div>
            )}
          </div>
        </AppContainer>
      </ReviewContainer>

      <Dialog
        open={isOpen}
        onOpenChange={() => {
          onClose();
        }}
      >
        <DialogContent
          className="sm:max-w-[695px] h-auto sm:h-fit outline-none"
          data-testid="new_dialog"
        >
          <DialogHeader className="gap-1.5">
            <DialogTitle className="text-lg text-center">
              Review Location
            </DialogTitle>
            <DialogDescription>
              Bonny and Clyde Street, Ajao Estate, Lagos
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => {
                e.preventDefault(); // Prevent the default form submission
                onSubmit();
              }}
            >
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={'outline'}
                    className={cn(
                      'w-full justify-between text-left font-normal h-11'
                      // !date && 'text-muted-foreground'
                    )}
                  >
                    {Object.keys(amenities).filter((key: any) => amenities[key])
                      .length > 0 ? (
                      <span className="capitalize flex flex-wrap">
                        {Object.keys(amenities)
                          .filter((key: any) => amenities[key])
                          .join(', ')}
                      </span>
                    ) : (
                      <span>Select Amenities</span>
                    )}
                    <Icons.ArrowNextIcon className="mr-2 h-4 w-4 rotate-90" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-2 bg-[#F3F7FF]">
                  <div className="w-full grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4 ">
                    {uniqueData.map((item: any) => (
                      <FormField
                        key={item.id}
                        control={form.control}
                        name={`amenities.${item.name
                          .toLowerCase()
                          .replace(/ /g, '_')}`} // Use name as lowercase with underscores
                        render={({ field }) => (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={!!field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                              <FormLabel className="text-[#1E1E1E]">
                                {item.name}
                              </FormLabel>
                            </div>
                          </FormItem>
                        )}
                      />
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
              <div className="flex flex-col items-start justify-start gap-2">
                <Label>Rate location</Label>
                <div className=" flex items-center justify-center gap-2">
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      style={{
                        color: rating > index ? '#FCE79A' : 'gray',
                        cursor: 'pointer',
                      }}
                      className="w-6 h-6"
                      onClick={() => handleStarClick(index)}
                    >
                      &#9733;
                    </span>
                  ))}
                  {/* <span>{rating}</span> */}
                </div>
              </div>

              <FormField
                control={form.control}
                name="review"
                rules={{ required: true }}
                render={({ field }) => (
                  <FormItem>
                    {' '}
                    <FormLabel>Write Review</FormLabel>
                    <FormControl className="w-full">
                      <Textarea
                        autoFocus
                        {...field}
                        id="review"
                        placeholder="Write a review"
                        autoCapitalize="none"
                        autoCorrect="off"
                        rows={6}
                        className={cn('', {
                          'border-red-600 focus-visible:ring-red-500 bg-[#F3F7FE] ':
                            !!errors.review,
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="as_anonymous"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Post as Anonymous</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <DialogFooter className="gap-4">
                <Button
                  type="submit"
                  size="lg"
                  className="p-3.5 w-full text-white h-[52px]"
                  variant="default"
                  disabled={submitButtonDisabled}
                >
                  Submit
                </Button>
                <Button
                  type="button"
                  onClick={onClose}
                  size="lg"
                  className=" p-3.5 w-full h-[52px]"
                  variant="outline"
                >
                  CANCEL
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
