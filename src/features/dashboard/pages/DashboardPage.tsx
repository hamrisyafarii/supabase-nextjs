import { useAuth } from "~/hooks/use-auth";
import ProtectedRoute from "~/components/layouts/ProtectedRoute";

const Dashboard = () => {
  const { currentUser, logout } = useAuth();

  return (
    <ProtectedRoute>
      <div className="p-8 flex justify-between items-center">
        <div>
          <div>Welcome to dashboard</div>
          <h1>{currentUser?.user_metadata.full_name}</h1>
        </div>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
