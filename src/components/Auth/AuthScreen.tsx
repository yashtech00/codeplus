// "use client"
// import { useState } from "react"
// import { SigninPage } from "./Signinpage"
// import { SignupPage } from "./SignupPage"
// import { SignInFlow } from "@/lib/utils"




// export default function AuthScreen({ authType }: { authType?: SignInFlow }) {
//     const [formType, setFormType] = useState<SignInFlow>(authType || "signin")
//     return (
//         <>
//             {formType === "signin" ?
//                 (<SigninPage setFormType={setFormType} />) : (<SignupPage setFormType={setFormType} />)
//             }
//         </>
//     )
// }