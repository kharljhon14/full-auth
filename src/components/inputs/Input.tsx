import { HTMLInputTypeAttribute } from 'react';
import { IoAlertCircle } from 'react-icons/io5';

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
  return (
    <div className="mt-3 w-[100%]">
      <label htmlFor={name} className="text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md">
        <div
          className="pointer-event-none absolute top-0.5 left-0 inset-y-0 flex items-center pl-3"
          style={{ transform: `${error ? 'translateY(-10px)' : ''}` }}
        >
          <span className="text-gray-500 text-sm">{icon}</span>
        </div>
        <input
          disabled={disabled}
          className="w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-teal-400 focus:ring-indigo-700 focus:ring-2 text-sm"
          type={type}
          placeholder={placeholder}
          {...register(name)}
          style={{ borderColor: `${error ? '#ed4337' : ''}` }}
        />
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
