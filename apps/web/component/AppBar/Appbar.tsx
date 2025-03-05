"use client"

import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"
import { Dialog } from '@radix-ui/react-dialog'
import { Button } from '../ui/button'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { SigninPage } from '../Auth/Signinpage'
import { SignupPage } from '../Auth/SignupPage'
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