import Input from '../inputs/Input';
import { FiMail, FiLock } from 'react-icons/fi';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import SlideButton from '../buttons/SlideButton';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { ResetSchema, ResetSchemaType } from '@/schemas/reset';
import axios from 'axios';

export default function Reset() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetSchemaType>({ resolver: zodResolver(ResetSchema) });

  const onSubmit: SubmitHandler<ResetSchemaType> = async (values) => {
    try {
      const { data } = await axios.post('/api/auth/forgot', { email: values.email });
      toast.success(data.message);
    } catch (err: any) {
      toast.error(err.response.data.message);
    }
  };

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
