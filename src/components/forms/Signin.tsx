import Input from '../inputs/Input';
import { FiMail, FiLock } from 'react-icons/fi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterSchemaType } from '@/schemas/register';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import SlideButton from '../buttons/SlideButton';
import { SigninSchema, SigninSchemaType } from '@/schemas/signin';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

export default function Signin() {
  const router = useRouter();
  const path = router.pathname;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninSchemaType>({ resolver: zodResolver(SigninSchema) });

  const onSubmit: SubmitHandler<SigninSchemaType> = async (values) => {
    try {
      console.log('Success');
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="w-full px-12 py-4">
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">Sign in</h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        Don&lsquo;t have an account? &nbsp;
        <button
          onClick={() => router.push({ pathname: path, query: { tab: 'signup' } })}
          className="text-teal-600 hover:text-teal-700 hover:underline cursor-pointer"
        >
          Sign up
        </button>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="my-8 text-sm">
        <Input
          name={'email'}
          label={'Email address'}
          type="email"
          icon={<FiMail />}
          placeholder={'example@mail.com'}
          register={register}
          error={errors?.email?.message}
          disabled={isSubmitting}
        />

        <Input
          name={'password'}
          label={'Password'}
          type="password"
          icon={<FiLock />}
          placeholder={'********'}
          register={register}
          error={errors?.password?.message}
          disabled={isSubmitting}
        />

        <SlideButton
          type="submit"
          text="Sign in "
          slide_text="Secure sign in"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}
