import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcrypt';
import prisma from './app/lib/prisma';


async function getUser(mngrId: string): Promise<any | undefined> {
  try {
    const existMngr = await prisma.sy_mngr.findFirst({
      where: {
        mngr_id: mngrId,
      },
    });

    return existMngr;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ mngrId: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { mngrId, password } = parsedCredentials.data;
          const user = await getUser(mngrId);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.mngr_pswd);
          if (passwordsMatch) {
            return user;
          }
        }

        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});
