import Background from '@/components/backgrounds/Background';
import Register from '@/components/forms/Register';

import Signin from '@/components/forms/Signin';
import { NextPageContext } from 'next';

export default function auth({ tab }: { tab: string }) {
  console.log(tab);
  return (
    <div className="w-full items-center justify-center">
      <div className="w-full h-100 flex items-center justify-center">
        <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full flex items-center justify-center">
          {tab === 'signin' ? <Signin /> : <Register />}
        </div>
        <Background image={tab === 'signin' ? '../../auth/login.jpg' : '../../auth/register.jpg'} />
      </div>
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const { req, query } = context;

  const tab = query.tab ? query.tab : 'signin';
  return {
    props: { tab: JSON.parse(JSON.stringify(tab)) },
  };
}
