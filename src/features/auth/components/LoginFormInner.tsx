import React from "react";

type loginFormInnerProps = {
  onSubmitLogin: (e: React.FormEvent) => void;
  onChangeLogin: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: {
    email: string;
    password: string;
  };
  isLoading: boolean;
};

const LoginFormInner = (props: loginFormInnerProps) => {
  return (
    <form className="space-y-2" onSubmit={props.onSubmitLogin}>
      <div>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={props.formData.email}
          onChange={props.onChangeLogin}
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
          onChange={props.onChangeLogin}
          className="border px-2 w-full rounded-md py-1"
          required
        />
      </div>

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
