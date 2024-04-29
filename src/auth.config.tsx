import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) { // middle ware를 통해 접근권한 부여받았는지 확인
      // 유저 인증 확인
      const isLoggedIn = !!auth?.user;
      // 보호하고싶은 경로 설정
      // 여기서는 /login 을 제외한 모든 경로가 보호됨.
      const isOnProtected = nextUrl.pathname.startsWith('/login');
      if (isOnProtected) {
        if (isLoggedIn) return true;
        return false; // '/login' 경로로 강제이동
      } else if (isLoggedIn) {
        // 홈페이지로 이동
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },
} satisfies NextAuthConfig;