import { NextPageContext } from 'next';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';

export default function Home() {
  const { data: session } = useSession();
  console.log(session);
  return (
    <>
      <h1 className="text-red-700">hello wotld</h1>
      <button onClick={() => signOut()}>Sign out</button>
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
