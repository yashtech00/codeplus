
// "use client"
// import { useParams } from "next/navigation";
// import { CommentProp, FullDiscussCard } from "../../../component/Discuss/FullDiscussCard";
// import { useDiscussHook } from "../../hooks/useDiscussHook";
// import { useEffect, useState } from "react";
// import axios from "axios";


// export default function CommentPage() {
//     const params = useParams<{ Id: string }>();
//     const Id = params?.Id;
//     console.log(Id,"yash page comment Id");
//     const [allComment,setAllComment] = useState<CommentProp[]>([])
//     const { loading, posts } = useDiscussHook();
//     async function fetchComments() {
//         try {
//             console.log(Id,"yash comment");
            
//             const res = await axios.get(`/api/discuss/comment/${Id}`)
//             setAllComment(res.data);
//         } catch (e) {
//             console.error(e);
//         }
//     }
//     console.log(allComment,"yash allCommetn");
    

//     useEffect(() => {
//         fetchComments()
//     },[])
//     return (
//         <div>
            
//                 <div >
//                     <FullDiscussCard allComment={allComment}  />
//                 </div>
        
            
//         </div>
//     )
// }