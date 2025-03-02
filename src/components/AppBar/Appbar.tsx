"use client"

import { Home, User, Briefcase, FileText } from 'lucide-react'
import { NavBar } from "@/components/ui/tubelight-navbar"
import { Dialog } from '@radix-ui/react-dialog'
import { Button } from '../ui/button'
import Link from 'next/link'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
export const AppBar = () => {

    const navItems = [
        { name: 'Home', url: '#', icon: Home },
        { name: 'About', url: '#', icon: User },
        { name: 'Projects', url: '#', icon: Briefcase },
        { name: 'Resume', url: '#', icon: FileText },
        

    ]
    const session = useSession();
    const router = useRouter()
    return (
        <div>
            
            <NavBar items={navItems} />
            <div className="flex items-center gap-x-2">
        {isSpectator && <WalletMultiButton/>}
        {session.data?.user && (
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700"
            onClick={() =>
              signOut({
                callbackUrl: "/",
              })
            }
          >
            Logout
          </Button>
        )}
        {!session.data?.user && (
          <div className="space-x-3">
            <Button
              className="bg-purple-600 text-white hover:bg-purple-700"
              onClick={() => router.push("/auth")}
            >
              Signin
            </Button>
            <Link
              href={{
                pathname: "/auth",
                query: {
                  authType: "signUp",
                },
              }}
            >
              <Button
                variant={"ghost"}
                className="text-white hover:bg-white/10"
              >
                Signup
              </Button>
            </Link>
          </div>
        )}
        
        {showThemeSwitch && <ThemeSwitcher />}
      </div>
        </div>
    )
}