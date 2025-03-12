"use client"

import { useSession } from "next-auth/react"
import type { PostProp } from "./DiscussPage"
import { ArrowDown, ArrowUp, MessageSquare, User } from "lucide-react"
import Link from "next/link"

export function DiscussCard({ posts }: { posts: PostProp }) {
  const session = useSession()

    return (
        <Link href={`/Discuss?id=${posts.id}`}>
    <div className="bg-neutral-800 rounded-2xl w-full max-w-[700px] p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-neutral-700 my-6">
      {/* User info section */}
      <div className="flex items-center gap-3 mb-4">
        <div className="relative h-10 w-10 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center">
          {session.data?.user.image ? (
            <img
              src={session.data.user.image || "/placeholder.svg"}
              alt={session.data?.user.name || "User"}
              className="h-full w-full object-cover"
            />
          ) : (
            <User className="h-6 w-6 text-neutral-400" />
          )}
        </div>
        <div className="text-neutral-200 font-medium">{session.data?.user ? session.data.user.name : "Anonymous"}</div>
      </div>

      {/* Post content */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-white mb-2">{posts.title}</h2>
        <p className="text-neutral-300 leading-relaxed">{posts.description}</p>
      </div>

      {/* Interaction metrics */}
      <div className="flex items-center gap-6 text-neutral-400">
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 hover:text-green-400 transition-colors">
            <ArrowUp className="h-5 w-5" />
            <span>{posts.upVote}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 hover:text-red-400 transition-colors">
            <ArrowDown className="h-5 w-5" />
            <span>{posts.downVote}</span>
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1 hover:text-blue-400 transition-colors">
            <MessageSquare className="h-5 w-5" />
            <span>{posts.comment}</span>
          </button>
        </div>
      </div>
            </div>
            </Link>
  )
}

