import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
// import { sql } from 'mysql2/promise';
import { z } from 'zod';
import type { User } from '@/app/lib/definitions';
import bcrypt from 'bcrypt';
import CredentialsProvider from "next-auth/providers/credentials";

async function getUser(id: string): Promise<User | undefined> {
  try {
    const {PrismaClient} = require('@prisma/client');
    const prisma = new PrismaClient();
    const user = await prisma.sy_mngr.findUnique({
      where: {
        mngr_id: id,
      },
    });
    return user.rows[0];
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        console.log(req)
        console.log(credentials)
        const parsedCredentials = z
          .object({ id: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { id, password } = parsedCredentials.data;
          const user = await getUser(id);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);
          if (passwordsMatch) return user;
        }
 
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
});