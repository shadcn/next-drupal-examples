import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import jwt_decode from "jwt-decode"

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Drupal account",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "Username" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const formData = new URLSearchParams()
        formData.append("grant_type", "password")
        formData.append("client_id", process.env.OAUTH_CLIENT_ID)
        formData.append("client_secret", process.env.OAUTH_CLIENT_SECRET)
        formData.append("username", credentials.username)
        formData.append("password", credentials.password)

        // Get access token from Drupal.
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/oauth/token`,
          {
            method: "POST",
            body: formData,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        )

        const data = await response.json()

        if (response.ok && data?.access_token) {
          return data
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Forward the access token
      if (user) {
        token.accessToken = user.access_token
      }

      return token
    },
    async session({ session, token }) {
      if (token?.accessToken) {
        const accessToken = token.accessToken as string
        session.accessToken = accessToken

        // Decode token and pass info to session.
        // This data will be available client-side.
        const decoded = jwt_decode<User>(accessToken)
        session.user.id = decoded.id
        session.user.email = decoded.email
      }
      return session
    },
  },
})
