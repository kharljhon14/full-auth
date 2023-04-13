import NextAuth, { Account, Profile, User } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '@/lib/mongodb';
import { JWT } from 'next-auth/jwt';
import { Adapter } from 'next-auth/adapters';
import CredentialsProvider from 'next-auth/providers/credentials';
import connectDB from '@/utils/connectDB';
import UserModel from '@/models/user';
import bcrypt from 'bcryptjs';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error('Credentials do not exists');

        await connectDB();
        const user = await UserModel.findOne({ email: credentials.email });

        if (!user) throw new Error('Email is not registered');

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user?.password);

        if (!isPasswordCorrect) throw new Error('Incorrect email or password');

        return user;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile,
    }: {
      token: JWT;
      user?: User | Adapter | undefined;
      account?: Account | null | undefined;
      profile?: Profile | undefined;
    }) {
      if (user) token.provider = account?.provider;

      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user && token.provider) session.user.provider = token.provider;

      return session;
    },
  },
});
