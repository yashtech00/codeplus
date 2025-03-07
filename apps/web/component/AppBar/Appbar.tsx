"use client"

import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"

export const AppBar = () => {

    const navItems = [
        { name: 'Home', url: '/', icon: Home },
        { name: 'Problems', url: '/Home', icon: User },
        { name: 'Blogs', url: '/Blogs', icon: Briefcase },
        { name: 'Review', url: '/Reviews', icon: FileText },

    ]
 
    return (
        <div className=' flex justify-between'>
           
            <div><NavBar items={navItems} /></div>
        </div>
    )
}