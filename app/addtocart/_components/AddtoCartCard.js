"use client";
import React from "react";
import Link from "next/link";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ShoppingBag } from "lucide-react";
import {
  addToCartDeleteAction,
  updateQuantityFromCartAction,
} from "@/app/actions/addtocart";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
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

const AddtoCartCard = ({ userCartItems }) => {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");

  const router = useRouter();

  const handleCartProductDelete = async (e, userId, productId, productName) => {
    e.preventDefault();
    try {
      const res = await addToCartDeleteAction(userId, productId);
      
      toast.success(`${productName} has been removed from Cart!`);
    } catch (error) {
      toast.error(`Failed to remove item from the Cart!`);
    }
    
  };

  const handleChangeQuantity = async (e, userId, productId,productName) => {
    e.preventDefault();

    try {
      const res = await updateQuantityFromCartAction(userId, productId, value);
      router.refresh();
      toast.success(`${productName} quantity has been changed from Cart!`);
    } catch (error) {
      toast.error(`Failed to change item quantity from the Cart!`);
      console.log(error);
    }
    
  };

  return (
    <>
      {userCartItems.map((cartItems) => (
        <div
          key={cartItems?._id}
          className="w-[100%] xl:w-[45%] lg:w-[100%] sm:w-[100%] md:w-[100%]  border-zinc-200 bg-zinc-300 border-2  rounded-3xl flex justify-start items-center flex-col p-3 gap-2 relative sm:p-5"
        >
          <Link
            href={`/products/${cartItems?.productId?._id}`}
            className="w-full flex justify-start items-center flex-col p-3 gap-2"
          >
            <div className="w-full h-60 sm:h-80">
              <Image
                src={cartItems?.productId?.productImage}
                alt={cartItems?.productId?.productName}
                width={500}
                height={500}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="w-full flex justify-between items-center">
              <h3 className="px-3 text-2xl font-semibold">
                {cartItems?.productId?.productName?.length > 15
                  ? cartItems?.productId?.productName.slice(0, 15) + "..."
                  : cartItems?.productId?.productName}
              </h3>
              <div className="  bg-zinc-100 px-1 rounded-full">
                <span className="text-[12px]">
                  {cartItems?.productId?.categoryId?.categoryName}
                </span>
              </div>
            </div>
            <div className="w-full flex justify-between items-center">
              <div className="flex justify-center items-center gap-2">
                <ShoppingBag color="black" />

                <span>{cartItems?.quantity} Quantity</span>
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="text-xl font-semibold">
                  {formatPrice(cartItems?.productId?.price)}
                </span>
              </div>
            </div>
          </Link>

          <div className="w-full flex justify-between items-center gap-2">
            <Dialog>
              <div className="w-1/2">
                <DialogTrigger asChild>
                  <Button className="w-full hover:cursor-pointer">
                    Change Quantity
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
                            : cartItems?.quantity}
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
                                      currentValue === value ? "" : currentValue
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
                    <form
                      onSubmit={(e) => {
                        handleChangeQuantity(
                          e,
                          cartItems?.userId?._id,
                          cartItems?.productId?._id,
                          cartItems?.productId?.productName
                        );
                      }}
                    >
                      <Button
                        className={`  ${
                          value === ""
                            ? "hover:cursor-no-drop bg-zinc-500 hover:bg-zinc-500"
                            : "hover:cursor-pointer  bg-zinc-950"
                        } `}
                        type="submit"
                      >
                        Change Quantity
                      </Button>
                    </form>
                  </DialogFooter>
                </DialogContent>
              </div>
            </Dialog>
            <form
              onSubmit={(e) =>
                handleCartProductDelete(
                  e,
                  cartItems?.userId?._id,
                  cartItems?.productId?._id,
                  cartItems?.productId?.productName
                )
              }
              className="w-1/2"
            >
              <Button
                variant={"destructive"}
                className={"w-full hover:cursor-pointer"}
              >
                Remove from Cart
              </Button>
            </form>
          </div>
        </div>
      ))}
    </>
  );
};

export default AddtoCartCard;
