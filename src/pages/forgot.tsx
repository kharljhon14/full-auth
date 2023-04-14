import Background from '@/components/backgrounds/Background';
import Reset from '@/components/forms/Reset';

export default function Forgot() {
  return (
    <div className="w-full items-center justify-center">
      <div className="w-full h-100 flex items-center justify-center">
        <div className="w-full sm:w-5/6 md:w-2/3 lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full flex flex-col items-center justify-center">
          <Reset />
        </div>
        <Background image={'../../auth/reset.jpg'} />
      </div>
    </div>
  );
}
