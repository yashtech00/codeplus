import { AdminAuthOptions } from "@/lib/admin-auth-options";
import { getSession } from "next-auth/react";  



export async function getServerSideProps() {  
  const session = await getSession(AdminAuthOptions);  
  
  if (!session) {  
    return {  
      redirect: {  
        destination: '/admin',  
        permanent: false,  
      },  
    };  
  }  

  return {  
    props: { session }, // Pass session to the page if needed  
  };  
}  