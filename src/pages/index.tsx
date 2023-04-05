import { NextPageContext } from 'next';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <h1 className="text-red-700">{session?.user?.name}</h1>
      <h2>{session?.user?.email}</h2>
      <img src={session?.user?.image as string} alt="avatar" className="w-1/8" />
      {session ? (
        <button onClick={() => signOut()}>Sign out</button>
      ) : (
        <button onClick={() => signIn()}>Sign in</button>
      )}
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  return {
    props: {
      session,
    },
  };
}
