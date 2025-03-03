import CredentialsProvider from "next-auth/providers/credentials";


export const AdminAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Admin Auth",
            credentials: {
                email: { type: "email" },
                password:{type:"password"}
            },
            async authorize(credentials){
                if(!credentials && !credentials.email)
            }
        }),
       
    ]
}