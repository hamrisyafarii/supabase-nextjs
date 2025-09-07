import React, { ChangeEvent } from "react";

type registerFormInnerProps = {
  onHandleRegister: (e: React.FormEvent) => void;
  onChangeRegister: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: {
    email: string;
    password: string;
  };
  isLoading: boolean;
};

const RegisterFormInner = (props: registerFormInnerProps) => {
  return (
    <form className="space-y-2" onSubmit={props.onHandleRegister}>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={props.formData.email}
          onChange={props.onChangeRegister}
          className="border px-2 w-full rounded-md py-1"
          required
        />
      </div>
      <div>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={props.formData.password}
          onChange={props.onChangeRegister}
          className="border px-2 w-full rounded-md py-1"
          required
        />
      </div>

      <div className="text-end text-xs text-gray-500 underline hover:underline-offset-2 cursor-pointer">
        Forgot password?
      </div>

      <button
        type="submit"
        disabled={props.isLoading}
        className="w-full border rounded-md bg-blue-500 text-white py-1 text-sm"
      >
        {props.isLoading ? "loading..." : "Sign Up"}
      </button>
      <span className="flex items-center">
        <span className="h-px flex-1 bg-gray-500"></span>
        <span className="shrink-0 px-4 text-sm text-gray-900">Or</span>
        <span className="h-px flex-1 bg-gray-500"></span>
      </span>
    </form>
  );
};
export default RegisterFormInner;
