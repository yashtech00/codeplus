
"use client"

import { useSession } from "next-auth/react"
import { PostProp } from "./DiscussPage"

export async function DiscussCard({posts}:{posts:PostProp}) {

    const session = useSession();
    return (
        <div>
            <div>
                {session.data?.user ? session.data.user.name : "Anonymous"}
            </div>
            
        </div>
    )
}