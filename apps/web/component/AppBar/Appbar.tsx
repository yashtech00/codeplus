"use client";

import { Button } from '@/components/ui/button';
import NavHeader from '@/components/ui/nav-header';
import { Code2, Star, Menu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export const AppBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className='flex justify-center '>
      <div className=" w-[70%] mt-10 flex justify-between items-center px-4 py-2 fixed z-20 border border-stone-800 rounded-full backdrop-blur-md bg-white/10">

        {/* Logo Section */}
        <Link href={"/"}>
        <div className="flex items-center space-x-2">
          
          <Code2 className="h-6 w-6 text-blue-500" />
            <span className="text-xl font-bold text-white">CodePlus</span>
            
          </div>
          </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:block">
          <NavHeader />
        </div>

        {/* GitHub Button - Hidden on mobile */}
        <div className="hidden md:block">
          <a
            href="https://github.com/yashtech00/codeplus"
            target="_blank"
            rel="noopener noreferrer"
            title="Visit our GitHub page"
          >
            <Button className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white">
              <Star className="h-4 w-4" />
              <span>Give us a star</span>
            </Button>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          title="Toggle mobile menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed top-16 left-0 right-0 bg-neutral-950 z-10 px-4 py-4 border-t border-gray-800">
          <div className="flex flex-col space-y-4">
            <NavHeader />
            <a
              href="https://github.com/yashtech00/codeplus"
              target="_blank"
              rel="noopener noreferrer"
              title="Visit our GitHub page"
              className="w-full"
            >
              <Button className="w-full flex items-center justify-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white">
                <Star className="h-4 w-4" />
                <span>Github Repo</span>
              </Button>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};