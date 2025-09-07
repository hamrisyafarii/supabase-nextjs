import { useRouter } from "next/router";
import { ReactNode, useEffect } from "react";
import { useAuth } from "~/hooks/use-auth";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !currentUser) {
      router.replace("/");
    }
  }, [currentUser, isLoading, router]);

  if (isLoading) return <div>Loading ...</div>;

  return children;
};

export default ProtectedRoute;
