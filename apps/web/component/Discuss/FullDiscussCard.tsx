import axios from "axios";
import { useState } from "react";
import { useDiscussHook } from "../../app/hooks/useDiscussHook";


export function FullDiscussCard() {
    const { posts } = useDiscussHook();
    const [commentText, setCommentText] = useState("");  
    const [commentCount, setCommentCount] = useState(posts.commentCount || 0);  
   
    async function fetchComments() {
        try {
            const res = await axios.get("/api/discuss/comment", {
                id:posts.id
            })
        } catch (e) {
            console.error(e);
            
        }
    }



    const handleCommentSubmit = async (e: React.FormEvent) => {  
        e.preventDefault();  
        try {  
            await axios.post('api/discuss/comment', { discussId: posts.id, comment: commentText });  
            
            setCommentText(""); // Clear the input field after submission  
        } catch (error) {  
            console.error("Error submitting comment:", error);  
        }  
    };  

    return (
        <div>
            {/* Comment Submission Form */}  
            <form onSubmit={handleCommentSubmit} className="flex mb-4">  
                <input  
                    type="text"  
                    value={commentText}  
                    onChange={(e) => setCommentText(e.target.value)}  
                    placeholder="Add a comment..."  
                    className="flex-1 p-2 rounded border border-neutral-                    700 bg-neutral-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"  
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
            <div className="comments-section">
                {/* @ts-ignore */}
                {Array.isArray(posts.comment) && posts.comment.map((comment) => (  
                    <div key={comment.id} className="bg-neutral-700 p-2 rounded mb-1">  
                        <p className="text-sm">{comment.comment}</p>  
                        <p className="text-xs text-neutral-400">Posted by {comment.user.name} on {new Date(comment.createdAt).toLocaleDateString()}</p>  
                    </div>  
                ))}  
            </div>
        </div>
    )
}