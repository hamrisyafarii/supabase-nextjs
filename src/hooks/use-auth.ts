import { User } from "@supabase/supabase-js";
import { useEffect, useState } from "react";
import { supabase } from "~/lib/supabase/client";

interface AuthSchema {
  email: string;
  password: string;
}

export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const initAuth = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (isMounted) {
        setCurrentUser(session?.user ?? null);
        setIsLoading(false);
      }

      const { data: subscription } = supabase.auth.onAuthStateChange(
        (_event, session) => {
          if (isMounted) {
            setCurrentUser(session?.user ?? null);
          }
        }
      );

      return () => subscription.subscription.unsubscribe();
    };

    void initAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  const register = async (data: AuthSchema) => {
    setIsLoading(true);
    setError(null);

    const { data: result, error } = await supabase.auth.signUp(data);

    if (error) {
      if (error.message.toLowerCase().includes("failed to fetch")) {
        setError(
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
        );
      } else if (error.status && error.status >= 500) {
        setError("Terjadi kesalahan di server. Coba lagi nanti.");
      } else {
        setError(`Terjadi kesalahan: ${error.message}`);
      }
      setIsLoading(false);
      return;
    }

    if (result?.user?.identities?.length === 0) {
      setError("Email sudah terdaftar. Silakan gunakan email lain.");
      setIsLoading(false);
      return;
    }

    alert(
      `Pendaftaran berhasil! Kami telah mengirimkan email verifikasi ke: ${data.email}. Silakan cek email Anda untuk mengaktifkan akun.`
    );

    setIsLoading(false);
  };

  const login = async (data: AuthSchema) => {
    setIsLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword(data);

    if (error) {
      if (error.status === 400 || error.status === 401) {
        setError("Email atau password salah.");
      } else if (error.message.toLowerCase().includes("failed to fetch")) {
        setError(
          "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
        );
      } else if (error.status && error.status >= 500) {
        setError("Terjadi kesalahan di server. Coba lagi nanti.");
      } else {
        setError(`Terjadi kesalahan: ${error.message}`);
      }

      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  const loginWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: { prompt: "select_account" },
          redirectTo: `${window.location.origin}/dashboard`,
        },
      });

      if (error) {
        if (error.message.toLowerCase().includes("redirect_uri_mismatch")) {
          alert("Konfigurasi Google OAuth salah. Hubungi administrator.");
        } else if (error.message.toLowerCase().includes("access_denied")) {
          alert("Login dibatalkan oleh pengguna.");
        } else if (error.message.toLowerCase().includes("failed to fetch")) {
          alert(
            "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
          );
        } else {
          alert(`Terjadi kesalahan login Google: ${error.message}`);
        }
        return;
      }
    } catch (error) {
      console.error("Google login error:", error);
      alert("Terjadi kesalahan saat mencoba login dengan Google.");
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setCurrentUser(null);
  };

  return {
    login,
    loginWithGoogle,
    logout,
    currentUser,
    isLoading,
    register,
    error,
  };
};
