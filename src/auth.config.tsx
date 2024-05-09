import { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user; 
      const isOnProtected = nextUrl.pathname.startsWith('/');
      if (isOnProtected) {
        if (isLoggedIn) return true;
        return false; // user가 아니면'/login' 경로로 강제이동
      } else if (isLoggedIn) {
        // 로그인 한 적이 있으면, home으로 이동
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
    async redirect({ url, baseUrl }) { // 로그인 시 홈으로 이동
      if (url.startsWith("/"))  {
        return `${baseUrl}${url}`
      }
      else if (new URL(url).origin === baseUrl) {
        return baseUrl
      } 
      return baseUrl
    }
  },
  
  
} satisfies NextAuthConfig;