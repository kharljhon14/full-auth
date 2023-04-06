import { NextPageContext } from 'next';
import { useSession, signIn, signOut, getSession } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const { data: session } = useSession();
  return (
    <div className="bg-black min-h-screen text-white flex items-center justify-center">
      <div className="mx-auto">
        <div className="border border-white relative flex flex-col rounded-lg w-[40rem] py-5">
          <div className="flex flex-col flex-wrap justify-center items-center">
            <div className="w-full text-right">
              <div className="py-6 px-3">
                {session ? (
                  <button
                    className="bg-teal-500 hover:bg-teal-700 text-md uppercase text-white font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150"
                    onClick={() => signOut()}
                  >
                    Log out
                  </button>
                ) : (
                  <button
                    className="bg-teal-500 hover:bg-teal-700 text-md uppercase text-white font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150"
                    onClick={() => signIn()}
                  >
                    Log in
                  </button>
                )}
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Image
                className="rounded-full"
                src={typeof session?.user.image === 'string' ? session?.user?.image : ''}
                alt={typeof session?.user.name === 'string' ? session?.user?.name : ''}
                width={160}
                height={160}
              />
            </div>
            <div className="text-center mt-12">
              <h3 className="text-4xl font-semibold mb-2">{session?.user.name}</h3>
            </div>
            <div className="text-sm mb-2 font-bold">{session?.user?.email}</div>
            <div className="mb-2 mt-10">
              You logged in using &nbsp;
              <span className="capitalize bg-teal-400 text-white px-4 py-1 ml-2 font-bold italic text-lg rounded-md">
                {session?.user?.provider}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
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
