import axios from 'axios';
import { NextPageContext } from 'next';
import { signIn } from 'next-auth/react';
import { useEffect, useState } from 'react';

export default function Activate({ token }: { token: string }) {
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const activateAccount = async () => {
    try {
      const { data } = await axios.put('/api/auth/activate', { token });

      setSuccess(data.message);
    } catch (err: any) {
      setError(err?.response?.data.message);
    }
  };

  useEffect(() => {
    activateAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <div className="flex items-center justify-center h-screen text-center">
      {error && (
        <div>
          <p className="text-red-500">{error}</p>
          <button
            className=" mt-4 bg-teal-500 hover:bg-teal-700 text-md uppercase text-white font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </div>
      )}

      {success && (
        <div>
          <p className="text-green-500">{success}</p>
          <button
            className="mt-4 bg-teal-500 hover:bg-teal-700 text-md uppercase text-white font-bold px-8 py-2 rounded-md sm:mr-2 mb-1 ease-linear transition-all duration-150"
            onClick={() => signIn()}
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;

  const token = query.token;

  return {
    props: { token },
  };
}
