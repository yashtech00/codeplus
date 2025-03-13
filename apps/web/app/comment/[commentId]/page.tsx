import { FullDiscussCard } from "../../../component/Discuss/FullDiscussCard"


export default function CommentPage({
    params:commentId
}: {
        params: {
        commentId:string
    }
    }) {
    
    return (
        <div>
            <FullDiscussCard/>
        </div>
    )
}