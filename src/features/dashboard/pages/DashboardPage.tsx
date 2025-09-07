import { useAuth } from "~/hooks/use-auth";
import ProtectedRoute from "~/components/layouts/ProtectedRoute";
import { PageContainer } from "~/components/layouts/PageContainer";

const Dashboard = () => {
  const { currentUser } = useAuth();

  return (
    <ProtectedRoute>
      <PageContainer>
        <div>Welcome to dashboard</div>
        <h1>{currentUser?.user_metadata.full_name}</h1>

        {currentUser?.email && <h1>{currentUser.email}</h1>}
      </PageContainer>
    </ProtectedRoute>
  );
};

export default Dashboard;
