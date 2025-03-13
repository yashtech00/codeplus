"use client";  

import { useSession } from "next-auth/react";  
import type { PostProp } from "../../app/hooks/useDiscussHook";  
import { ArrowDown, ArrowUp, MessageSquare, User } from "lucide-react";  
import axios from "axios";  
import { useState } from "react";  
import Link from "next/link";

export function DiscussCard({ posts }: { posts: PostProp }) {  
    const session = useSession();  
    const [upVote, setUpVote] = useState(posts.upVote);  
    const [downVote, setDownVote] = useState(posts.downVote || 0);  
   

    // Handle upvote  
    const handleUpvote = async () => {  
        try {  
            await axios.patch('api/discuss', { id: posts.id });  
            setUpVote(upVote + 1);  
        } catch (error) {  
            console.error("Error upvoting:", error);  
        }  
    };  

    // Handle downvote  
    const handleDownvote = async () => {  
        try {  
            await axios.delete('api/discuss', { data: { id: posts.id } });  
            setDownVote(downVote + 1);  
        } catch (error) {  
            console.error("Error downvoting:", error);  
        }  
    };  

    // Handle comment submission  
    
    return ( 
        <Link href={`/comment?id=${posts.id}`}>
        <div className="bg-neutral-800 rounded-2xl w-full max-w-lg p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-neutral-700 my-6">  
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
                <div className="text-neutral-200 font-medium">  
                    {session.data?.user ? session.data.user.name : "Anonymous"}  
                    <p className="text-sm text-neutral-400">Posted on {new Date(posts.createdAt).toLocaleDateString()}</p>  
                </div>  
            </div>  

            {/* Discussion Title and Description */}  
            <div className="mb-6">  
                <h2 className="text-xl font-bold text-white mb-2">{posts.title}</h2>  
                <p className="text-neutral-300 leading-relaxed">{posts.description}</p>  
            </div>  

            {/* Voting Buttons */}  
            <div className="flex items-center gap-6 text-neutral-400 mb-4">  
                <button onClick={handleUpvote} className="flex items-center">  
                    <ArrowUp className="text-green-500" />  
                    <span className="ml-1">{upVote}</span>  
                </button>  
                <button onClick={handleDownvote} className="flex items-center">  
                    <ArrowDown className="text-red-500" />  
                    <span className="ml-1">{downVote}</span>  
                </button>  
                {/* <div className="flex items-center">  
                    <MessageSquare className="text-blue-500" />  
                    <span className="ml-1">{commentCount} Comments</span>  
                </div>   */}
            </div>  

              
            </div>
            </Link>    
    );  
}  