import Input from '../inputs/Input';
import { CiUser } from 'react-icons/ci';
import { FiMail } from 'react-icons/fi';
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
          placeholder={'example'}
          register={register}
          error={errors?.first_name?.message}
          disabled={isSubmitting}
        />
        <Input
          name={'last_name'}
          label={'Last name'}
          type="text"
          icon={<CiUser />}
          placeholder={'example'}
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
        placeholder={'example'}
        register={register}
        error={errors?.email?.message}
        disabled={isSubmitting}
      />
      <Input
        name={'phone'}
        label={'Phone number'}
        type="number"
        icon={<BsTelephone />}
        placeholder={'example'}
        register={register}
        error={errors?.phone?.message}
        disabled={isSubmitting}
      />
      <button>Submit</button>
    </form>
  );
}
