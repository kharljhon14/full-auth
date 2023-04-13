import Background from '@/components/backgrounds/Background';
import SocialButton from '@/components/buttons/SocialButton';
import Register from '@/components/forms/Register';

import Signin from '@/components/forms/Signin';
import { NextPageContext } from 'next';
import { getCsrfToken, getProviders } from 'next-auth/react';

export default function auth({
  tab,
  callbackUrl,
  csrfToken,
  providers,
}: {
  tab: string;
  callbackUrl: string;
  csrfToken: string;
  providers: any;
}) {
  return (
    <div className="w-full items-center justify-center">
      <div className="w-full h-100 flex items-center justify-center">
        <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full flex flex-col items-center justify-center">
          {tab === 'signin' ? <Signin callbackUrl={callbackUrl} csrfToken={csrfToken} /> : <Register />}
          <div className="w-full flex items-center justify-between">
            <div className="w-full h-[1px] bg-gray-300"></div>
            <span className="text-sm uppercase mx-6 text-gray-400">Or</span>
            <div className="w-full h-[1px] bg-gray-300"></div>
          </div>
          <div className="mt-3 ">
            {providers.map((provider: any) => {
              if (provider.name === 'Credentials') return;

              return (
                <SocialButton
                  key={provider.id}
                  id={provider.id}
                  text={tab === 'signup' ? `Sign up with ${provider.name}` : `Sign in with ${provider.name}`}
                  csrfToken={csrfToken}
                />
              );
            })}
          </div>
        </div>
        <Background image={tab === 'signin' ? '../../auth/login.jpg' : '../../auth/register.jpg'} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { req, query } = context;
  const callbackUrl = query.callbackUrl ? query.callbackUrl : process.env.NEXTAUTH_URL;

  const csrfToken = await getCsrfToken(context);

  const providers = (await getProviders()) as any;
  const tab = query.tab ? query.tab : 'signin';
  return {
    props: {
      tab: JSON.parse(JSON.stringify(tab)),
      callbackUrl,
      csrfToken,
      providers: Object.values(providers),
    },
  };
}
