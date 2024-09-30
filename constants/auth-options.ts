import { prisma } from "@/prisma/prisma-client"
import { compare, hashSync } from "bcryptjs"
import { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GitHubProvider from "next-auth/providers/github"

export const authOptions: AuthOptions = {
    providers: [
      GitHubProvider({
        clientId: process.env.GITHUB_ID || "",
        clientSecret: process.env.GITHUB_SECRET || "",
        profile(profile) {
          return {
            id: profile.id,
            name: profile.name || profile.login,
            email: profile.email,
            image: profile.avatar_url,
          }
        },
      }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" },
        },
        async authorize(credentials) {
          if (!credentials) {
            return null
          }
  
          const values = {
            email: credentials.email,
          }
  
          const findUser = await prisma.user.findFirst({
            where: values,
          })
  
          if (!findUser) {
            return null
          }
  
          const isValidPassword = await compare(
            credentials.password,
            findUser.password
          )
  
          if (!isValidPassword) {
            return null
          }
  
          return {
            id: findUser.id,
            fullName: findUser.fullName,
            email: findUser.email,
          }
        },
      }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async signIn({ user, account }) {
        try {
          if (account?.provider === "credentials") {
            return true
          }
  
          if (!user.email) {
            return false
          }
  
          const findUser = await prisma.user.findFirst({
            where: {
              OR: [
                {
                  provider: account?.provider,
                  providerId: account?.providerAccountId,
                },
                { email: user.email },
              ],
            },
          })
  
          if (findUser) {
            await prisma.user.update({
              where: {
                id: findUser.id,
              },
              data: {
                provider: account?.provider,
                providerId: account?.providerAccountId,
              },
            })
            return true
          }
  
          await prisma.user.create({
            data: {
              email: user.email,
              fullName: user.name || "User #" + user.id,
              password: hashSync(user.id.toString(), 10),
              provider: account?.provider,
              providerId: account?.providerAccountId
            }
          })
  
          return true
        } catch (error) {
          console.error("[SIGNIN] Error", error)
          return false
        }
      },
      async jwt({ token }) {
        if (!token.email) {
          return token
        }
  
        const findUser = await prisma.user.findFirst({
          where: {
            email: token.email,
          },
        })
  
        if (findUser) {
          token.id = String(findUser.id)
          token.email = findUser.email
          token.fullName = findUser.fullName
        }
  
        return token
      },
      session({ session, token }) {
        if (session?.user) {
          session.user.id = token.id
        }
  
        return session
      },
    },
  }