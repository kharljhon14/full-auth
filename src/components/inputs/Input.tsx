import { HTMLInputTypeAttribute } from 'react';

interface Props {
  name: string;
  label: string;
  type: HTMLInputTypeAttribute;
  icon: JSX.Element;
  placeholder: string;
}

export default function Input({ name, label, type, icon, placeholder }: Props) {
  return (
    <div className="relative mt-1 rounded-md shadow-sm">
      <div className="pointer-event-none absolute left-0 inset-y-0 flex items-center pl-3">
        <span className="text-gray-500 text-sm">{icon}</span>
      </div>
      <input
        className="w-full py-2 pr-7 pl-8 block rounded-md border border-gray-300 outline-offset-2 outline-transparent focus:border-teal-400 focus:ring-indigo-700 focus:ring-2 text-sm"
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}
