"use client";
import React, { useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Heart } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BadgeDollarSign } from "lucide-react";
import { Package } from "lucide-react";
import { Calendar } from "lucide-react";
import { Truck } from "lucide-react";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { addToCartAction } from "@/app/actions/addtocart";
import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import { toggleWishlistAction } from "@/app/actions/wishlist";
import { createCheckOutSession } from "@/app/actions/stripe";
import Image from "next/image";
import formatPrice from "@/lib/formatPrice";

const quantity = [
  {
    value: "1",
    label: "1",
  },
  {
    value: "2",
    label: "2",
  },
  {
    value: "3",
    label: "3",
  },
  {
    value: "4",
    label: "4",
  },
  {
    value: "5",
    label: "5",
  },
];

const ProductDetailsAndImage = ({
  productdetails,
  loggedInUser,
  getProductInCart,
  isItemInWishlist,
}) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [wishList, setWishList] = React.useState(false);

     const router = useRouter();
  useEffect(() => {
    if (isItemInWishlist) {
      setWishList(true);
    
    } else {
      setWishList(false);
     
    }
  }, [isItemInWishlist]);

 

  const handleSubmit = async (e) => {
    e.preventDefault();

      if(!loggedInUser) {
            return redirect('/login')
           }
    

    if (value === "") {
      toast.warning("You have to Select Quantity!");
    } else {
      try {
        const res = await addToCartAction(
          productdetails?._id,
          loggedInUser?._id,
          value
        );
        toast.success(`${productdetails?.productName} added To Cart`);
        router.refresh();
      } catch (error) {
        toast.error(error);
      }
    }
  };

  

  const handleWishlist = async (e) => {
    e.preventDefault();


    try {
      await toggleWishlistAction(
        loggedInUser?._id,
        productdetails?._id,
        wishList
      );
      if (wishList) {
        toast.success(
          `${productdetails?.productName} Added to Wishlist Successfully!`
        );
         router.refresh();
      } else {
        toast.success(
          `${productdetails?.productName} Removed from Wishlist Successfully!`
        );
         router.refresh();
      }
    } catch (error) {
      toast.error(`Failed to add ${productdetails?.productName} to Wishlist!`);
    }
  };

  const handleBuyNowAction = async (data) =>{
     
    
    const {url} = await createCheckOutSession(data)
    window.location.assign(url)
  }

  return (
    <>
      <div className="w-[100%] mx-auto  px-6 py-8 flex justify-start items-start  flex-col lg:flex-row lg:px-12 md:w-[90%]">
        <div className="h-full w-full">
          <Image
            src={productdetails?.productImage}
            alt={productdetails?.productName}
            width={500}
            height={500}
            className="object-contain"
          />
        </div>
        <div className="h-full px-5 py-8 w-full   flex justify-start items-start flex-col gap-5">
          <Badge
            variant="destructive"
            className={"bg-green-600 font-semibold text-sm"}
          >
            {productdetails?.categoryId?.categoryName}
          </Badge>
          <h1 className="text-5xl font-semibold">
            {productdetails?.productName}
          </h1>
          <h4 className="text-3xl font-semibold">
            {formatPrice(productdetails?.price)}
          </h4>
          <div className="w-full flex justify-start items-center gap-10 ">
            {getProductInCart && (
              <>
                <Link className="w-1/3" href="/addtocart">
                  <Button className="w-full hover:cursor-pointer">
                    Go to Cart
                  </Button>
                </Link>
              </>
            )}

            {!getProductInCart && (
              <Dialog>
                <div className="w-1/3">
                  <DialogTrigger asChild>
                    <Button className="w-full hover:cursor-pointer">
                      Add to Cart
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Select Quantity</DialogTitle>
                      <DialogDescription>Choose The Quantity</DialogDescription>
                    </DialogHeader>
                    <div className="w-full mx-auto">
                      <Label className="py-3">Quantity</Label>
                      <Popover open={open} onOpenChange={setOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between border-1 border-zinc-400"
                          >
                            {value
                              ? quantity.find(
                                  (framework) => framework.value === value
                                )?.label
                              : "Select Quantity"}
                            <ChevronsUpDown className="opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <Command>
                            <CommandList>
                              <CommandEmpty>No framework found.</CommandEmpty>
                              <CommandGroup>
                                {quantity.map((framework) => (
                                  <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                      setValue(
                                        currentValue === value
                                          ? ""
                                          : currentValue
                                      );
                                      setOpen(false);
                                    }}
                                  >
                                    {framework.label}
                                    <Check
                                      className={cn(
                                        "ml-auto",
                                        value === framework.value
                                          ? "opacity-100"
                                          : "opacity-0"
                                      )}
                                    />
                                  </CommandItem>
                                ))}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <form onSubmit={handleSubmit}>
                        <Button
                          className={`  ${
                            value === ""
                              ? "hover:cursor-no-drop bg-zinc-500 hover:bg-zinc-500"
                              : "hover:cursor-pointer  bg-zinc-950"
                          }`}
                          type="submit"
                        >
                          Add to Cart
                        </Button>
                      </form>
                    </DialogFooter>
                  </DialogContent>
                </div>
              </Dialog>
            )}

            <form action={handleBuyNowAction} className="w-1/3">
              <input type="hidden" name="productId" value={productdetails?._id} />
              <Button className="w-full hover:cursor-pointer">Buy Now</Button>
            </form>
            <form onSubmit={handleWishlist}>
              <Button
                type="submit"
                onClick={() => {
                  setWishList(!wishList);
                }}
                className="hover:cursor-pointer border-zinc-400"
                variant={"outline"}
              >
                <Heart
                  color={isItemInWishlist ? "red" : "black"}
                  fill={isItemInWishlist ? "red" : "white"}
                />
              </Button>
            </form>
          </div>

          <div className="w-full">
            <Accordion collapsible defaultValue="item-1">
              <AccordionItem className="border-0" value="item-1">
                <AccordionTrigger className="text-2xl">
                  Description / About Product
                </AccordionTrigger>
                <AccordionContent className="text-lg">
                  {productdetails?.productDescription}
                </AccordionContent>
              </AccordionItem>
              <AccordionItem className="border-0" value="item-1">
                <AccordionTrigger className="text-2xl">
                  Shipping
                </AccordionTrigger>
                <AccordionContent>
                  <div className="w-full flex justify-between items-start flex-wrap flex-col lg:flex-row">
                    <div className="w-full flex justify-start items-center gap-6 px-8 mb-4 lg:w-1/2">
                      <BadgeDollarSign size={36} color="black" />
                      <span className="flex justify-start items-start flex-col gap-1">
                        <span className="text-zinc-400 text-sm">Discount</span>
                        <span className="text-zinc-900 text-xl font-medium">
                          Dis 50%
                        </span>
                      </span>
                    </div>
                    <div className="w-full flex justify-start items-center gap-6 px-8 mb-4 lg:w-1/2">
                      <Package size={36} color="black" />
                      <span className="flex justify-start items-start flex-col gap-1">
                        <span className="text-zinc-400 text-sm">Package</span>
                        <span className="text-zinc-900 text-xl font-medium">
                          Regular Package
                        </span>
                      </span>
                    </div>
                    <div className="w-full flex justify-start items-center gap-6 px-8 mb-4 lg:w-1/2">
                      <Calendar size={36} color="black" />
                      <span className="flex justify-start items-start flex-col gap-1">
                        <span className="text-zinc-400 text-sm">
                          Delivery Time
                        </span>
                        <span className="text-zinc-900 text-xl font-medium">
                          3-4 Working Days
                        </span>
                      </span>
                    </div>
                    <div className="w-full flex justify-start items-center gap-6 px-8 mb-4 lg:w-1/2">
                      <Truck size={36} color="black" />
                      <span className="flex justify-start items-start flex-col gap-1">
                        <span className="text-zinc-400 text-sm">
                          Estimation Arrives
                        </span>
                        <span className="text-zinc-900 text-xl font-medium">
                          10-12 October 2024
                        </span>
                      </span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsAndImage;
