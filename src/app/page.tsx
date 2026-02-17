import DashboardPage from "@/components/dashboard";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="mx-auto max-w-6xl">
        <DashboardPage />
      </div>
    </div>
  );
}
