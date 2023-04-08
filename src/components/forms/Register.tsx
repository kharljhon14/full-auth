import Input from '../inputs/Input';
import { CiUser } from 'react-icons/ci';
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
      </div>
      <button>Submit</button>
    </form>
  );
}
