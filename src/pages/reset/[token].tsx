import Background from '@/components/backgrounds/Background';
import ResetPassword from '@/components/forms/ResetPassword';
import { NextPageContext } from 'next';

export default function reset({ token }: { token: string }) {
  return (
    <div className="w-full items-center justify-center">
      <div className="w-full h-100 flex items-center justify-center">
        <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full flex flex-col items-center justify-center">
          <ResetPassword token={token} />
        </div>
        <Background image={'../../auth/reset.jpg'} />
      </div>
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
