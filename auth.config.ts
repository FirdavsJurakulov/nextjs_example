import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
        const isLoggenIn = !!auth?.user;
        const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
        if (isOnDashboard) {
            if (isLoggenIn) return true;
            return false;
        } else if (isLoggenIn) {
            return Response.redirect(new URL('/dashboard', nextUrl));
        }
        return true;
    },
  },
  providers: []
} satisfies NextAuthConfig;