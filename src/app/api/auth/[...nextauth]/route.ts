import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import axios from "axios"
import { JWT } from "next-auth/jwt"
import { Provider } from "@/provider/Providers"

interface AuthResponse {
  data: {
    jwt: string
    user: {
      id: string
      email: string
      name: string
      role: string
    
      authMethod: string
    }
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "user-credentials",
      name: "User Login",
      credentials: {
        identifier: {},
        password: {},
      },
      authorize: async (credentials) => {
          console.log("test", credentials)
        if (!credentials) return null

        try {
          const res = await axios.post<AuthResponse>(
            `${process.env.NEXT_PUBLIC_LOCAL_PORT}/login`,
            {
              email: credentials.identifier,
              password: credentials.password,
            }
          )

          console.log("res", res)

          const { jwt, user } = res.data.data

          if (user) {
            return {
              jwt,
              id: user.id,
              email: user.email,
              name: user.name,
              role: user.role, 
             
            }
          }
          return null
        } catch (error: any) {
          if (error.response?.data?.error) {
            throw new Error(error.response.data.error.message)
          }
          throw new Error("Admin authentication failed")
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }: { token: JWT; user?: User }) => {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.role = (user as any).role
   
        token.jwt = (user as any).jwt
      }
      return token
    },
    session: async ({ session, token }: { session: any; token: JWT }) => {
      session.user = {
        id: token.id,
        email: token.email,
        name: token.name,
        role: token.role,
  
      }
      session.jwt = token.jwt
      return session
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/home",
  },
  debug: true,
})

export { handler as GET, handler as POST }