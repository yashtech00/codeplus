"use client"

import { useSession } from "next-auth/react";
import type { PostProp } from "./DiscussPage";
import { ArrowDown, ArrowUp, MessageSquare, User } from "lucide-react";
import axios from "axios";
import { useState } from "react";

export function DiscussCard({ posts }: { posts: PostProp }) {
    const session = useSession();
    const [upVote, setUpVote] = useState(posts.upVote);
    const [downVote, setDownVote] = useState(posts.downVote || 0);
    const [commentCount, setCommentCount] = useState(posts.commentCount.length || 0);
    const [commentText, setCommentText] = useState("");

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
    const handleCommentSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('api/discuss/comment', { discussId: posts.id, comment: commentText });
            setCommentCount(commentCount + 1);
            setCommentText(""); // Clear the input field after submission  
        } catch (error) {
            console.error("Error submitting comment:", error);
        }
    };

    return (
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
                <div className="text-neutral-200 font-medium">{session.data?.user ? session.data.user.name : "Anonymous"}
                  <p className="text-sm text-neutral-400">Posted on {new Date(posts.createdAt).toLocaleDateString()}</p>
                </div>
            </div>





          
            {/* Discussion Title and Description */}
            <div className="mb-6">
                <h2 className="text-xl font-bold text-white mb-2">{posts.title}</h2>
                <p className="text-neutral-300 leading-relaxed">{posts.description}</p>
            </div>
            {/* Voting Buttons */}
            <div className="flex items-center gap-6 text-neutral-400">
                <div className="flex items-center gap-2">
                    <button onClick={handleUpvote} className="flex items-center">
                        <ArrowUp className="text-green-500" />
                        <span className="ml-1">{upVote}</span>
                    </button>
                </div>
                <div className="flex items-center gap-2">
                    <button onClick={handleDownvote} className="flex items-center">
                        <ArrowDown className="text-red-500" />
                        <span className="ml-1">{downVote}</span>
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    <MessageSquare className="text-blue-500" />
                    <span className="ml-1">{commentCount} Comments</span>
                </div>
            </div>

            {/* Comment Submission Form */}
            <form onSubmit={handleCommentSubmit} className="flex mb-4">
                <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment..."
                    className="flex-1 p-2 rounded border border-neutral-700 bg-neutral-800 text-white"
                    required
                />
                <button
                    type="submit"
                    className="ml-2 px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                >
                    Submit
                </button>
            </form>

            {/* Display Comments */}
            {/* Assuming you have fetched comments and passed them down as a prop called 'comments' */}
            <div className="comments-section">
                {/* This will render individual comments */}
                {Array.isArray(posts.comment) && posts.comment.map((comment) => (
                    <div key={comment.id} className="bg-neutral-700 p-2 rounded mb-1">
                        <p className="text-sm">{comment.comment}</p>
                        <p className="text-xs text-neutral-400">Posted by {comment.user.name} on {new Date(comment.createdAt).toLocaleDateString()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}  