
"use client"

import { useSession } from "next-auth/react"
import { PostProp } from "./DiscussPage"

export async function DiscussCard({posts}:{posts:PostProp}) {

    const session = useSession();
    return (
        <div>
            <div>
            <div>
                {session.data?.user ? session.data.user.name : "Anonymous"}
            </div>
                <div> {posts.createdAt.toString()}</div>
            </div>
            <div>
                <div>{posts.title}</div>
                <div>{posts.description}</div>
            </div>
            <div>
                {posts.upVote}
                {posts.downVote}
                {posts.comment}
            </div>
        </div>
    )
}