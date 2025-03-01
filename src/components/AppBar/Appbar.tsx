"use client"

import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"
export const AppBar = () => {

    const navItems = [
        { name: 'Home', url: '#', icon: Home },
        { name: 'About', url: '#', icon: User },
        { name: 'Projects', url: '#', icon: Briefcase },
        { name: 'Resume', url: '#', icon: FileText },
        { name: 'Login', url: '#', icon: FileText },
        { name: 'Signup', url: '#', icon: FileText }
      ]
    return (
        <div>
            
        <NavBar items={navItems}/>
        </div>
    )
}