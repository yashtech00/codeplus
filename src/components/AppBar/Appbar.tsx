"use client"

import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"
export const AppBar = () => {

    const navItems = [
        { name: 'Home', url: '#', icon: Home },
        { name: 'About', url: '#', icon: User },
        { name: 'Projects', url: '#', icon: Briefcase },
        { name: 'Resume', url: '#', icon: FileText }
      ]
    return (
        <div>
            <div className=' text-white'>hello</div>
        <NavBar items={navItems}/>
        </div>
    )
}