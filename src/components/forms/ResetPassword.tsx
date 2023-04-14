import Input from '../inputs/Input';
import { CiUser } from 'react-icons/ci';
import { FiMail, FiLock } from 'react-icons/fi';
import { BsTelephone } from 'react-icons/bs';
import { SubmitHandler, useForm } from 'react-hook-form';
import { RegisterSchema, RegisterSchemaType } from '@/schemas/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';
import Link from 'next/link';
import SlideButton from '../buttons/SlideButton';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useRouter } from 'next/router';
import { ResetPasswordSchema, ResetPasswordSchemaType } from '@/schemas/reset-password';

interface Props {
  token: string;
}

export default function ResetPassword({ token }: Props) {
  const [passwordScore, setPasswordScore] = useState(0);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordSchemaType>({ resolver: zodResolver(ResetPasswordSchema) });

  const onSubmit: SubmitHandler<ResetPasswordSchemaType> = async (values) => {
    try {
      const { data } = await axios.post('/api/auth/reset', { password: values.password, token });
      reset();
      toast.success(data.message);
      router.push('/auth');
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    const password = watch().password;
    setPasswordScore(zxcvbn(password ? password : '').score);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch().password]);

  return (
    <div className="w-full px-12 py-4">
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">Reset password</h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        <Link className="text-teal-600 hover:text-teal-700 hover:underline cursor-pointer" href="/auth">
          Sign in instead
        </Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="my-8 text-sm">
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
        {watch().password?.length > 0 && (
          <div className="flex mt-2">
            {Array.from(Array(5).keys()).map((span, i) => (
              <span className="w-1/5 px-1" key={i}>
                <div
                  className={`h-2 rounded-xl b ${
                    passwordScore <= 2 ? 'bg-red-400' : passwordScore < 4 ? 'bg-yellow-400' : 'bg-green-500'
                  }`}
                ></div>
              </span>
            ))}
          </div>
        )}

        <Input
          name={'confirm_password'}
          label={'Confirm password'}
          type="password"
          icon={<FiLock />}
          placeholder={'********'}
          register={register}
          error={errors?.confirm_password?.message}
          disabled={isSubmitting}
        />

        <SlideButton
          type="submit"
          text="Change password"
          slide_text="Secure"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}
