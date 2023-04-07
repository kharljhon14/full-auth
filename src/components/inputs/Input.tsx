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
    <>
      <input type="text" />
    </>
  );
}
