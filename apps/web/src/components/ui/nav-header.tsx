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
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

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
        className="relative mx-auto flex w-fit flex-wrap md:flex-nowrap rounded-full  bg-natural-950 text-white p-1"
        onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
      >
       

        <Tab setPosition={setPosition}>
          <button onClick={handleProblem} className="cursor-pointer">
            Problems
          </button>
        </Tab>
        
        <Link href={"/Discuss"}>
          <Tab setPosition={setPosition}>Discuss</Tab>
        </Link>
        {session?.user.id ? (
          <Tab setPosition={setPosition}>
            <button onClick={() => signOut({ callbackUrl: "/" })} >
           Logout
       </button>
          </Tab>
           
      ) : (
        <>
          <Tab setPosition={setPosition}>
            <SigninPage />
          </Tab>
          <Tab setPosition={setPosition}>
            <SignupPage />
          </Tab>
        </>
      )}
        

        <Cursor position={position} />
      </ul>
      <Toaster />
    </>
  );
}

const Tab = ({
  children,
  setPosition,
}: {
  children: React.ReactNode;
  setPosition: any;
}) => {
  const ref = React.useRef<HTMLLIElement>(null);
  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();
        setPosition({
          width,
          opacity: 1,
          left: ref.current.offsetLeft,
        });
      }}
      className="relative z-10 block cursor-pointer px-2 py-1 text-xs text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
    >
      {children}
    </li>
  );
};

const Cursor = ({ position }: { position: any }) => {
  return (
    <motion.li
      animate={position}
      className="absolute z-0 h-7 rounded-full bg-white md:h-12"
    />
  );
};

export default NavHeader;