"use client"

import Link from "next/link"
import { DiscussPage } from "./DiscussPage"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function DiscussHome() {
  return (
    <div className="bg-gradient-to-b from-neutral-950 to-neutral-800 min-h-screen flex justify-center w-full ">
      <div className="w-full max-w-5xl px-4 py-12 md:py-16 mt-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold text-white">Discuss Coding Problems</h1>
            <p className="text-neutral-400">Join the conversation and share your insights</p>
          </div>
          <div>
            <Link href="/publish">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create Discussion
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-neutral-900/50 backdrop-blur-sm rounded-xl p-4 md:p-6 shadow-xl border border-neutral-800">
          <div className="space-y-2 mb-6">
            <h2 className="text-xl font-semibold text-white">Recent Discussions</h2>
            <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
          </div>

          <div className="space-y-4">
            <DiscussPage />
          </div>
        </div>
      </div>
    </div>
  )
}

