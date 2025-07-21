import React from "react";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { Instagram } from "lucide-react";
import { Facebook } from "lucide-react";
import { Twitter } from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="w-full mx-auto bg-zinc-300 h-auto  flex justify-between items-start flex-col sm:items-center py-5 sm:flex-row px-8 md:w-[90%] md:rounded-t-3xl">
        <div className="flex justify-center items-start gap-10 flex-col sm:flex-row">
          <div className="flex justify-center items-start flex-col gap-3">
            <h3 className="text-xl font-medium">About</h3>
            <Link href={"#"}>Blog</Link>
            <Link href={"#"}>Meet The Team</Link>
            <Link href={"#"}>About Us</Link>
          </div>
          <div className="flex justify-center items-start flex-col gap-3">
            <h3 className="text-xl font-medium">Support</h3>
            <Link href={"#"}>Contact Us</Link>
            <Link href={"#"}>Shipping</Link>
            <Link href={"#"}>Return</Link>
            <Link href={"#"}>FAQ</Link>
          </div>
        </div>
        <div className=" flex justify-start items-start flex-col gap-3 my-3 sm:my-0">
          <p className="text-md text-zinc-600">Social Media</p>
          <div className="flex justify-center items-center gap-10 ">
            <Link href={"#"}>
              <div className="bg-black rounded-full p-3">
                <Linkedin color="white" />
              </div>
            </Link>
            <Link href={"#"}>
              <div className="bg-black rounded-full p-3">
                <Instagram color="white" />
              </div>
            </Link>
            <Link href={"#"}>
              <div className="bg-black rounded-full p-3">
                <Facebook color="white" />
              </div>
            </Link>
            <Link href={"#"}>
              <div className="bg-black rounded-full p-3">
                <Twitter color="white" />
              </div>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
