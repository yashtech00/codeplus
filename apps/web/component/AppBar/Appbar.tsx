"use client";  

import { Button } from '@/components/ui/button';  
import NavHeader from '@/components/ui/nav-header';  
import { Code2, Star } from 'lucide-react';  

export const AppBar = () => {  
  return (  
    <div className="flex justify-between items-center w-full bg-neutral-950 px-4 py-4 absolute z-20">  
      {/* Logo Section */}  
      <div className="flex items-center space-x-2">  
        <Code2 className="h-6 w-6 text-blue-500" />  
        <span className="text-xl font-bold text-white">CodePlus</span>  
      </div>  
      
      {/* Navigation Header */}  
      <NavHeader />  
      
      {/* GitHub Button */}  
      <div>  
        <Button className="flex items-center space-x-1 bg-blue-500 hover:bg-blue-600 text-white">  
          <Star className="h-4 w-4" />  
          <span>Github Repo</span>  
        </Button>  
      </div>  
    </div>  
  );  
};  