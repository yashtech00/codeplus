"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function PublishPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
    const router = useRouter();
  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await axios.post("/api/discuss", {
        title,
        description,
      })
      console.log(res, "publish res")
      // Reset form after successful submission
      setTitle("")
        setDescription("")
        router.push("/Discuss")
    } catch (e) {
      console.error(e)
    }
  }

    return (
        <div className="bg-gradient-to-b from-neutral-950 to-neutral-800 min-h-screen flex justify-center ">
    <div className="w-full max-w-[700px] mx-auto p-6 mt-24">
      <h1 className="text-2xl font-bold text-white mb-6">Create New Discussion</h1>

      <div className="bg-neutral-800 rounded-2xl p-6 shadow-lg border border-neutral-700">
        <form onSubmit={handlePublish} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-neutral-200">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter the title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-neutral-500"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-neutral-200">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Enter the description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-neutral-700 border-neutral-600 text-white placeholder:text-neutral-400 focus:border-neutral-500 focus:ring-neutral-500 min-h-[150px]"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              className="bg-transparent border-neutral-600 text-neutral-300 hover:bg-neutral-700 hover:text-white"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
              Publish
            </Button>
          </div>
        </form>
      </div>
            </div>
            </div>
  )
}

