import Input from '../inputs/Input';

export default function Register() {
  return (
    <form action="" className="my-8 text-sm">
      <div className="gap-2 md:flex">
        <Input name={''} label={''} type={'number'} icon={undefined} placeholder={''} />
      </div>
    </form>
  );
}
