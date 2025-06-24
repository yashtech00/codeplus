"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { SignupPage } from "../../../component/Auth/SignupPage";
import { SigninPage } from "../../../component/Auth/Signinpage";
import { signOut, useSession } from "next-auth/react";
import { toast } from "react-toastify";
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";

function NavHeader() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleProblem = () => {
    if (!session?.user) {
      toast("you are not logged in");
      router.push("/");
    } else {
      router.push("/problems");
    }
  };
  return (
    <>
      <ul
        className="relative mx-auto flex w-fit flex-wrap md:flex-nowrap rounded-full  bg-natural-950 text-white py-4 space-x-6 items-center "
        
      >

        <div className="hover:text-blue-500">
          <button onClick={handleProblem} className="cursor-pointer">
            Problems
          </button>
        </div>
        <Link href={"/Discuss"}>
          <div className="hover:text-blue-500">Discuss</div>
        </Link>
        <Link href={"/Contest"}>
          <div className="hover:text-blue-500">Contest</div>
        </Link>
        <Link href={"/Learning"}>
          <div className="hover:text-blue-500">Learning</div>
        </Link>
        {session?.user.id ? (
          <div className="hover:text-blue-500">
            <button onClick={() => signOut({ callbackUrl: "/" })} >
              Logout
            </button>
          </div>

        ) : (
          <>
            <div className="hover:text-blue-500">
              <SigninPage />
            </div>
            <div className="hover:text-white">
              <SignupPage />
            </div>
          </>
        )}
      </ul>
      <Toaster />
    </>
  );
}



export default NavHeader;