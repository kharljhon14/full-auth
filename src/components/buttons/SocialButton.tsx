import { signIn } from 'next-auth/react';
import { FaDiscord, FaFacebook, FaGithub, FaGoogle, FaSpotify, FaTwitter } from 'react-icons/fa';

interface Props {
  id: string;
  text: string;
  csrfToken: string;
}

const colors: any = {
  google: '#DB4437',
  facebook: '#4285F4',
  auth0: '#eb5424',
  github: '#333',
  discord: '#7289da',
  spotify: '#1DB954',
  twitter: '#1DA1F2',
};

export default function SocialButton({ id, text, csrfToken }: Props) {
  const createIconJsx = () => {
    switch (id) {
      case 'google':
        return <FaGoogle />;
      case 'github':
        return <FaGithub />;
      case 'discord':
        return <FaDiscord />;
      case 'spotify':
        return <FaSpotify />;
      case 'twitter(Leagcy)':
        return <FaTwitter />;
      default:
        return;
    }
  };

  return (
    <form className="w-full" method="post" action={`/api/auth/signin/${id}`}>
      <input type="hidden" name={csrfToken} defaultValue={csrfToken} />
      <button
        className="mb-2 py-2 px-4 flex justify-center items-center gap-2 hover:bg-gray-700 focus:ring-gray-500 focus:ring-offset-gray-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-md"
        type="button"
        onClick={() => signIn(id)}
        style={{ background: `${colors[id]}` }}
      >
        {text}
      </button>
    </form>
  );
}
