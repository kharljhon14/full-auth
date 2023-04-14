import Input from '../inputs/Input';
import { FiMail, FiLock } from 'react-icons/fi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SlideButton from '../buttons/SlideButton';
import { SigninSchema, SigninSchemaType } from '@/schemas/signin';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { signIn } from 'next-auth/react';
import Link from 'next/link';

export default function Reset() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninSchemaType>({ resolver: zodResolver(SigninSchema) });

  const onSubmit: SubmitHandler<SigninSchemaType> = async (values) => {};

  return (
    <div className="w-full px-12 py-4">
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">Forgot password</h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        Sign in instead &nbsp;
        <Link href="/auth" className="text-teal-600 hover:text-teal-700 hover:underline cursor-pointer">
          Sign in
        </Link>
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

        <SlideButton type="submit" text="Send email" slide_text="Secure" icon={<FiLock />} disabled={isSubmitting} />
      </form>
    </div>
  );
}
