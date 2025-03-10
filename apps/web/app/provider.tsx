"use client"


import { SessionProvider } from "next-auth/react"
import React from "react"
import { ToastContainer } from "react-toastify";

export const Providers = ({ children }: { children: React.ReactNode }) => {
    return <SessionProvider>
         <ToastContainer
        
        position="top-right"
            autoClose={3000}
            theme="light"
      />
        {children}
    </SessionProvider>
}