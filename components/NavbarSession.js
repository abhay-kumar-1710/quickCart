"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import { CircleUserRound } from "lucide-react";
import { LogIn } from "lucide-react";
import { LogOut } from "lucide-react";
import { Heart } from "lucide-react";
import { ShoppingCart } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser } from "lucide-react";
import { BaggageClaim } from "lucide-react";

const NavbarSession = () => {
  const { data: session } = useSession();
  const [loginSession, setLoginSession] = useState();
  const [loginUser, setLoginUser] = useState();

  useEffect(() => {
    setLoginSession(session);

    async function fetchMe() {
      try {
        const res = await fetch("/api/me");
        if (!res.ok) {
          const text = await res.text();
          console.error("API Error:", res.status, text);
          return;
        }
        const data = await res.json();
      
        

        setLoginUser(data);
      
        
      } catch (error) {
        throw new Error(error);
      }
    }
    fetchMe();
  }, [session]);

  return (
    <>
      {loginSession && (
        <>
          <div className="hidden lg:flex">
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-zinc-400 flex justify-center items-center">
                  <span className="text-2xl font-semibold ">
                    {loginUser?.firstName[0]}
                  </span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-zinc-200 w-40">
                <DropdownMenuItem>
                  <Link
                    className="flex justify-center items-center gap-3 text-md font-medium"
                    href="/profile"
                  >
                    <CircleUser />
                    <span>Profile</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="flex justify-center items-center gap-3 text-md font-medium"
                    href="/profile/orders"
                  >
                    <BaggageClaim />
                    <span>My Orders</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="flex justify-center items-center gap-3 text-md font-medium"
                    href="/wishlist"
                  >
                    <Heart />
                    <span>Wishlist</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="flex justify-center items-center gap-3 text-md font-medium"
                    href="/addtocart"
                  >
                    <ShoppingCart />
                    <span>My Cart</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <button
                    className="flex justify-center items-center gap-3 text-md font-medium"
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                  >
                    <LogOut />
                    Log Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      )}

      {!loginSession && (
        <>
          <Link href="/signup">
            <Button className="hover:cursor-pointer hidden sm:hidden md:hidden lg:flex">
              Sign Up <CircleUserRound />
            </Button>
          </Link>
          <Link href="/login">
            <Button className="hover:cursor-pointer hidden sm:hidden md:hidden lg:flex">
              Log In <LogIn />
            </Button>
          </Link>
        </>
      )}

      <div className="relative z-50 flex justify-center items-center  lg:hidden">
        <Sheet>
          <SheetTrigger>
            <MenuIcon />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle className="flex justify-start items-start flex-col gap-3">
                <h1 className="text-3xl font-semibold">QuickCart</h1>
                {loginSession && (
                  <h5>
                    Welcome, {`${loginUser?.firstName} ${loginUser?.lastName}`}
                  </h5>
                )}
              </SheetTitle>
              <SheetDescription>
                <div className="flex justify-center items-start flex-col gap-10 py-25 px-2">
                  <Link href="/" className="text-2xl font-semibold">
                    Home
                  </Link>
                  <Link href="/products" className="text-2xl font-semibold">
                    Products
                  </Link>
                  <Link href="#" className="text-2xl font-semibold">
                    Blog
                  </Link>
                  <Link href="#" className="text-2xl font-semibold">
                    Wishlist
                  </Link>
                  <Link href="#" className="text-2xl font-semibold">
                    Cart
                  </Link>
                </div>
                <div className="w-full flex justify-center items-center gap-5 flex-col">
                  {!loginSession && (
                    <>
                      <Link className="w-full" href="/signup">
                        <Button className="hover:cursor-pointer w-full ">
                          Sign Up <CircleUserRound />
                        </Button>
                      </Link>
                      <Link className="w-full" href="/login">
                        <Button className="hover:cursor-pointer  w-full">
                          Log In <LogIn />
                        </Button>
                      </Link>
                    </>
                  )}

                  {loginSession && (
                    <>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          signOut();
                        }}
                        className="hover:cursor-pointer  w-full"
                      >
                        Log Out <LogOut />
                      </Button>
                    </>
                  )}
                </div>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>
    </>
  );
};

export default NavbarSession;
