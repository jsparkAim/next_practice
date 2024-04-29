import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
 
export default NextAuth(authConfig).auth;
 
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.png).*)'], // matcher는 /api, _next/static, _next/image 및 .png과 같은 경로를 제외하고 모든 경로에서 NextAuth를 실행
};