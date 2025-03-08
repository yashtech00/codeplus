"use client"; 

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

function NavHeader() {
  const [position, setPosition] = useState({
    left: 0,
    width: 0,
    opacity: 0,
  });

  return (
    <ul
      className="relative mx-auto flex w-fit rounded-full border-2 border-black bg-black text-white p-1"
      onMouseLeave={() => setPosition((pv) => ({ ...pv, opacity: 0 }))}
    >
      <Link href={"/"}><Tab setPosition={setPosition}>Home</Tab></Link>
      <Link href={"/problems"}><Tab setPosition={setPosition} >Problems</Tab></Link>
     <Link href={"/Blog"}> <Tab setPosition={setPosition}>Blog</Tab></Link>
      <Link href={{
        pathname:"/"
      }}> <Tab setPosition={setPosition}>Login</Tab></Link>
     <Link> <Tab setPosition={setPosition}>Signup</Tab></Link>

      <Cursor position={position} />
    </ul>
  );
}

const Tab = ({
  children,
  setPosition,
}: {
  children: React.ReactNode;
  setPosition: any;
}) => {
  const ref = useRef<HTMLLIElement>(null);
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
      className="relative z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase text-white mix-blend-difference md:px-5 md:py-3 md:text-base"
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
