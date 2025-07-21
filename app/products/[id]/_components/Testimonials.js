"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Star } from "lucide-react";
import { formatMyDate } from "@/lib/formatMyDate";
import RatingTestimonial from "./RatingTestimonial";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { postReview } from "@/app/actions/testimonials";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Testimonials = ({ testimonials, productdetails, loggedInUser }) => {
  const [formData, setFormData] = useState({
    review: "",
    rating: "",
  });

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
   

    try {
      const res = await postReview(
        loggedInUser?._id,
        productdetails?._id,
        formData
      );
      // const data = await res.json()

      toast.success("Your Review Added Successfully!");
      router.refresh();

      // if(res.ok) {

      // }else {
      //   toast.error(data.error);
      // }
    } catch (error) {
      toast.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="w-[90%] mx-auto  px-8 py-8 flex justify-start items-start flex-col gap-5 md:px-12">
      <div className="w-full flex justify-between items-start sm:flex-center flex-col sm:flex-row gap-5">
        <h2 className="text-3xl">Rating & Reviews</h2>

        {loggedInUser && (
          <Dialog>
            <DialogTrigger asChild className="hover:cursor-pointer">
              <Button>
                Add Review <CirclePlus />
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Review</DialogTitle>
                <DialogDescription>
                  Your Review will be helpful to us for development our service.
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label>Review </Label>
                    <Textarea
                      name="review"
                      onChange={handleChange}
                      value={formData.review}
                      placeholder="Write a Review..."
                      className="capitalize"
                      required
                    />
                  </div>
                  <div className="grid gap-3">
                    <Label>Rating (Between 1 to 5)</Label>
                    <Input
                      name="rating"
                      onChange={handleChange}
                      value={formData.rating}
                      placeholder="Give Rating in number from 1 to 5"
                      required
                    />
                  </div>
                </div>
                <DialogFooter className="py-3">
                  <DialogClose asChild>
                    <Button className="hover:cursor-pointer" variant="outline">
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button className="hover:cursor-pointer" type="submit">
                    Post Review
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {!testimonials.length == 0 && (
        <div className="w-full">
          <Carousel>
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial._id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="w-full py-5 px-5 h-48 rounded-2xl bg-zinc-300 flex justify-start items-start flex-col gap-3">
                    <div className="w-full flex justify-start items-center gap-5">
                      <Image
                        className="w-14 h-14 rounded-full"
                        src="https://i.pravatar.cc"
                        alt="profile Image"
                        width={100}
                        height={100}
                      />
                      <h4 className="text-2xl font-medium">{`${testimonial?.userId?.firstName} ${testimonial?.userId?.lastName}`}</h4>
                    </div>
                    <div className="flex justify-between items-start w-full flex-col sm:flex-row gap-3 sm:items-center">
                      <div className="flex justify-center items-center gap-3">
                        <RatingTestimonial rating={testimonial?.rating} />
                      </div>
                      <span>{formatMyDate(testimonial?.reviewOnDate)}</span>
                    </div>
                    <p>{`"${testimonial?.review}"`}</p>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      )}

      {testimonials.length == 0 && (
        <>
          <div className="w-full flex justify-start items-center py-8">
            <h3 className="text-3xl font-medium">No Reviews To Show</h3>
          </div>
        </>
      )}
    </div>
  );
};

export default Testimonials;
