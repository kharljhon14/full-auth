import Input from '../inputs/Input';
import { CiUser } from 'react-icons/ci';
import { FiMail, FiLock } from 'react-icons/fi';
import { BsTelephone } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { RegisterSchema, RegisterSchemaType } from '@/schemas/register';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';

export default function Register() {
  const [passwordScore, setPasswordScore] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

  const onSubmit = (data: any) => {
    console.log(data);
  };

  useEffect(() => {
    const password = watch().password;
    setPasswordScore(zxcvbn(password ? password : '').score);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch().password]);

  return (
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

      <button>Submit</button>
    </form>
  );
}
