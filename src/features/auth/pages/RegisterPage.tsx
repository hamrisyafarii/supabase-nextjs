import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "~/hooks/use-auth";
import RegisterFormInner from "~/features/auth/components/RegisterFormInner";
import { useForm } from "react-hook-form";
import { authDataSchema, AuthDataSchema } from "../forms/auth.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "~/components/ui/form";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle, currentUser, isLoading, error } =
    useAuth();

  const form = useForm<AuthDataSchema>({
    resolver: zodResolver(authDataSchema),
  });

  const { handleSubmit } = form;

  useEffect(() => {
    if (!isLoading && currentUser) {
      router.replace("/dashboard");
    }
  }, [currentUser, isLoading, router]);

  const handleRegister = handleSubmit(async (data: AuthDataSchema) => {
    await register(data);
  });

  return (
    <div
      className={`${geistSans.className} ${geistMono.className} font-sans flex items-center justify-center min-h-screen mx-2`}
    >
      <div className="border p-4 w-full max-w-sm rounded-md bg-gray-50">
        <h1 className="text-xl font-semibold">Sign up</h1>
        <p className="text-gray-500 text-sm mb-2">please, enter your details</p>

        {error && (
          <div className="bg-red-500 px-2 py-1  text-sm text-white text-center my-2 rounded-md">
            {error}
          </div>
        )}

        <Form {...form}>
          <RegisterFormInner
            isLoading={isLoading}
            onHandleRegister={handleRegister}
          />
        </Form>

        <button
          onClick={loginWithGoogle}
          disabled={isLoading}
          className="w-full border rounded-md py-1 flex justify-center items-center bg-transparent text-sm mt-2"
        >
          <FcGoogle />
          {isLoading ? "loading..." : "Login with google"}
        </button>

        <div className="text-center text-sm text-gray-500 mt-2">
          Already have an account?
          <Link
            href="/"
            className="underline text-blue-500 hover:underline-offset-2"
          >
            SignIn
          </Link>
        </div>
      </div>
    </div>
  );
}
