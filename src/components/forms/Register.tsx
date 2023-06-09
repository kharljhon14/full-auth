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
import router, { useRouter } from 'next/router';

export default function Register() {
  const [passwordScore, setPasswordScore] = useState(0);

  const router = useRouter();
  const path = router.pathname;
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

  const onSubmit: SubmitHandler<RegisterSchemaType> = async (values) => {
    try {
      const { data } = await axios.post('/api/auth/signup', { ...values });
      reset();
      toast.success(data.message);
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
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">Sign up</h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        You already have an account? &nbsp;
        <Link className="text-teal-600 hover:text-teal-700 hover:underline cursor-pointer" href="/auth">
          Sign in
        </Link>
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="my-8 text-sm">
        <div className="gap-2 md:flex">
          <Input
            name={'first_name'}
            label={'First name'}
            type="text"
            icon={<CiUser />}
            placeholder={'John'}
            register={register}
            error={errors?.first_name?.message}
            disabled={isSubmitting}
          />
          <Input
            name={'last_name'}
            label={'Last name'}
            type="text"
            icon={<CiUser />}
            placeholder={'Doe'}
            register={register}
            error={errors?.last_name?.message}
            disabled={isSubmitting}
          />
        </div>
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
          name={'phone'}
          label={'Phone number'}
          type="number"
          icon={<BsTelephone />}
          placeholder={'+(xxx) xxx-xx-xx'}
          register={register}
          error={errors?.phone?.message}
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

        <div className="flex items-center mt-3">
          <input className="mr-2 rounded focus:ring-0" type="checkbox" id="accept" {...register('accept')} />
          <label htmlFor="accept" className="text-gray-700">
            I accept the&nbsp;
            <Link href="/" target="_blank" className="text-blue-600 hover:text-blue-700 hover:underline">
              terms
            </Link>
            &nbsp;and&nbsp;
            <Link href="/" target="_blank" className="text-blue-600 hover:text-blue-700 hover:underline">
              privacy policy
            </Link>
          </label>
        </div>
        <div>{errors?.accept && <p className="text-sm text-red-600 mt-1">{errors?.accept?.message}</p>}</div>

        <SlideButton
          type="submit"
          text="Sign up"
          slide_text="Secure sign up"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
}
