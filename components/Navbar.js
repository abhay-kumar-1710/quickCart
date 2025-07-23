import React from "react";
import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Heart, Search, ShoppingCart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CircleUserRound } from "lucide-react";
import { LogIn } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import NavbarSession from "./NavbarSession";

const Navbar = () => {
  return (
    <>
      <nav className="mx-auto w-[100%] bg-white  flex justify-between items-center px-2 py-3 fixed top-0 left-1/2 transform -translate-x-1/2 z-50 xl:w-[90%] md:w-[90%] sm:w-full sm:px-8 sm:py-5 sm:rounded-b-3xl shadow-2xl shadow-zinc-600">
        <Link href="/" className="text-3xl font-semibold">
          QuickCart
        </Link>
        <div className="hidden justify-center items-center gap-5 sm:hidden md:hidden lg:flex">
          <Link href="/" className="text-md font-semibold">
            Home
          </Link>
          <Link href="/products" className="text-md font-semibold">
            Products
          </Link>
          <Link href="/profile" className="text-md font-semibold">
            Profile
          </Link>
        </div>
        <div className="flex justify-center items-center gap-4 lg:gap-8">
          <Link href="/wishlist">
            <div className="hover:cursor-pointer">
              <Heart />
            </div>
          </Link>
          <Link href="/addtocart">
            <div className="hover:cursor-pointer">
              <ShoppingCart />
            </div>
          </Link>

          <NavbarSession />
        </div>
      </nav>
    </>
  );
};

export default Navbar;
