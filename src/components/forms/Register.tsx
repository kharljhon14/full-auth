import Input from '../inputs/Input';
import { CiUser } from 'react-icons/ci';
import { FiMail, FiLock } from 'react-icons/fi';
import { BsTelephone } from 'react-icons/bs';
import { useForm } from 'react-hook-form';
import { RegisterSchema, RegisterSchemaType } from '@/schemas/register';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchemaType>({ resolver: zodResolver(RegisterSchema) });

  const onSubmit = (data: any) => {
    console.log(data);
  };

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
      <div className="gap-2 md:flex">
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
      </div>

      <button>Submit</button>
    </form>
  );
}
