// UserFormInput.tsx
import React from 'react';
import { Control } from 'react-hook-form';
import { Input } from "~/components/ui/input";
import { Switch } from "~/components/ui/switch";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "~/components/ui/form";

type UserFormInputProps = {
  control: Control<any>,
  name: string,
  type: 'text' | 'email' | 'password' | 'switch' | 'datetime-local',
  label: string,
  placeholder: string
};

const UserFormInput: React.FC<UserFormInputProps> = ({ control, name, type, label, placeholder }) => {
  console.log(control._formValues)
  return (
    <FormField control={control} name={name} render={({ field }) => (
      <FormItem className={type === 'switch' ? 'flex items-center gap-5' : ''}>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          {type === 'switch' ? (
            <Switch checked={field.value} onCheckedChange={field.onChange} />
          ) : (
            <Input type={type} placeholder={placeholder} {...field} />
          )}
        </FormControl>
      </FormItem>
    )} />
  );
}

export default UserFormInput;
