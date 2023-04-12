import { HTMLInputTypeAttribute, useState } from 'react';
import { IoAlertCircle } from 'react-icons/io5';
import { ImEye, ImEyeBlocked } from 'react-icons/im';

interface Props {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  icon: JSX.Element;
  placeholder: string;
  register: any;
  error: any;
  disabled: boolean;
}

export default function Input({ name, label, type, icon, placeholder, register, error, disabled }: Props) {
  const [showPassword, setShowPassword] = useState(false);

  const calculateTranslate = (): string => {
    if (name === 'first_name' || name == 'last_name') return 'translateY(-22px)';
    // if (name === 'email') return 'translate(-12px)';
    // if (name === 'phone') return 'translate(-12px)';
    // if (name === 'password') return 'translate(-12px)';

    return '';
  };

  return (
    <div className="mt-3 w-[100%]">
      <label htmlFor={name} className="text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md">
        <div
          className="pointer-event-none absolute  left-0 inset-y-0 flex items-center pl-3"
          style={{ transform: `${error ? 'translateY(-11.7px)' : ''}` }}
        >
          <span className="text-gray-500 text-sm">{icon}</span>
        </div>
        <input
          disabled={disabled}
          className="w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-teal-400 focus:ring-indigo-700 focus:ring-2 text-sm"
          type={showPassword ? 'text' : type}
          placeholder={placeholder}
          {...register(name)}
          style={{ borderColor: `${error ? '#ed4337' : ''}` }}
        />

        {/* Show and hide password */}

        {(name === 'password' || name === 'confirm_password') && (
          <div
            className="absolute top-2.5 right-2 text-xl text-gray-700 cursor-pointer"
            style={{ right: `${error ? '2rem' : ''}` }}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <ImEye /> : <ImEyeBlocked />}
          </div>
        )}
        {error && (
          <div className="fill-red-500 absolute right-2 top-2.5 text-xl">
            <IoAlertCircle fill="#ed4337" />
          </div>
        )}
        {error && <p className="text-sm text-[#ed4337] mt-1">{error}</p>}
      </div>
    </div>
  );
}
