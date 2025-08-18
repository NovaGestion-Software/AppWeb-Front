import { useViewportGuard } from "@/Hooks/useViewportGuard";
import LoginForm from "./components/LoginForm";
import ViewportBlocker from "@/Components/Layouts/ViewportBlocker";

export default function Portal() {
  const isBlocked = useViewportGuard();

  return (
    <main className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-300 to-blue-800">
      {isBlocked && <ViewportBlocker />}
      {!isBlocked && <LoginForm />}
    </main>
  );
}
