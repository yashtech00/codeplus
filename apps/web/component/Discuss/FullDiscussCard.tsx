import axios from "axios";
import { useEffect, useState } from "react";
import { useDiscussHook } from "../../app/hooks/useDiscussHook";
import { useSession } from "next-auth/react";

interface CommentProp{
    id:string,
    comment: string,
    createdAt : Date 
}
export interface PostProp {  
    id: string;  
    title: string;  
    description: string;  
    upVote: number;  
    downVote: number | null; // Updated to accept null for downVote  
    commentCount: number;  
    createdAt: Date;  
}

export function FullDiscussCard() {
    const { loading, posts } = useDiscussHook();
    const [commentText, setCommentText] = useState("");  
    const [allComment,setAllComment] = useState<CommentProp[]>([])
    const session = useSession();
    async function fetchComments() {
        try {
            const res = await axios.get("/api/discuss/comment",
                {
                    data:
                    {
                        id: posts.id
                    }
                })
            setAllComment(res.data);
        } catch (e) {
            console.error(e);
        }
    }

    useEffect(() => {
        fetchComments()
    },[])
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
            {/* full discuss card */}
            <div>

            </div>
            
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
              
                {Array.isArray(allComment) && allComment.map((comment, index) => (  
                    <div key={comment.id} className="bg-neutral-700 p-2 rounded mb-1">  
                        <p className="text-sm">{comment.comment}</p>  
                        <p className="text-xs text-neutral-400">Posted by {session?.data?.user.name} on {new Date(comment.createdAt).toLocaleDateString()}</p>  
                    </div>  
                ))}  
            </div>
        </div>
    )
}