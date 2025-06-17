import React from "react"

import { cn } from "@/lib/utils"

interface AvatarCirclesProps {
  className?: string
  numPeople?: number
  avatarUrls: string[]
}

const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
   
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse bg-red-500  ", className)}>
      {avatarUrls.map((url, index) => (
        <img
          key={index}
          className="z-20 h-9 w-9 rounded-full border-2 border-white dark:border-gray-800"
          src={url}
          width={40}
          height={40}
          alt={`Avatar ${index + 1}`}
        />
      ))}
      </div>
  )
}

export { AvatarCircles }
