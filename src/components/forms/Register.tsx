import Input from '../inputs/Input';
import { CiUser } from 'react-icons/ci';

export default function Register() {
  return (
    <form action="" className="my-8 text-sm">
      <div className="gap-2 md:flex">
        <Input name={''} label={''} type="text" icon={<CiUser />} placeholder={'example'} />
      </div>
    </form>
  );
}
