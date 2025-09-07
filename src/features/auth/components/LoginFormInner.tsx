import React from "react";
import { useFormContext } from "react-hook-form";
import { AuthDataSchema } from "../forms/auth.schema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";

type loginFormInnerProps = {
  onSubmitLogin: (e: React.FormEvent) => void;
  isLoading: boolean;
};

const LoginFormInner = (props: loginFormInnerProps) => {
  const form = useFormContext<AuthDataSchema>();

  const { control } = form;

  return (
    <form className="space-y-2" onSubmit={props.onSubmitLogin}>
      <FormField
        control={control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>E-mail</FormLabel>
            <FormControl>
              <Input placeholder="Email" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="password"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Password</FormLabel>
            <FormControl>
              <Input type="password" placeholder="*****" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="text-end text-xs text-gray-500 underline hover:underline-offset-2 cursor-pointer">
        Forgot password?
      </div>

      <button
        disabled={props.isLoading}
        type="submit"
        className="w-full border rounded-md bg-blue-500 text-white py-1 text-sm hover:bg-blue-400 cursor-pointer"
      >
        {props.isLoading ? "loading..." : "Sign In"}
      </button>
      <span className="flex items-center">
        <span className="h-px flex-1 bg-gray-500"></span>
        <span className="shrink-0 px-4 text-sm text-gray-900">Or</span>
        <span className="h-px flex-1 bg-gray-500"></span>
      </span>
    </form>
  );
};
export default LoginFormInner;
