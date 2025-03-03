"use client"

import { AdminSigninPage } from "@/components/Admin/AdminLogin"
import AdminPage from "@/components/Admin/AdminPage"

export default function Admin() {
    return (
        <div>
            <AdminSigninPage />
            <AdminPage />
            </div>
    )
}