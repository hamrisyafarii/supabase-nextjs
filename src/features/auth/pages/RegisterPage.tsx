import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "~/hooks/use-auth";
import RegisterFormInner from "~/features/auth/components/RegisterFormInner";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RegisterPage() {
  const router = useRouter();
  const { register, loginWithGoogle, currentUser, isLoading, error } =
    useAuth();
  const initialStatuRegisterUser = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialStatuRegisterUser);

  useEffect(() => {
    if (!isLoading && currentUser) {
      router.replace("/dashboard");
    }
  }, [currentUser, isLoading, router]);

  const handleChangeRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(formData);
  };

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

        <RegisterFormInner
          formData={formData}
          isLoading={isLoading}
          onChangeRegister={handleChangeRegister}
          onHandleRegister={handleRegister}
        />

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
