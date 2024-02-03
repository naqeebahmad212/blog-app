"use client"

import { Session } from "@prisma/client"
import { SessionProvider } from "next-auth/react"

export {SessionProvider as default} from 'next-auth/react'

// interface ProviderProps{
//     // session:Session,
//     children : React.ReactNode
// }


// export default function Provider({children} :ProviderProps){
//     return(
//         <SessionProvider>
//             {children}
//         </SessionProvider>
//     )
// }