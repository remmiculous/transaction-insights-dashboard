import { ThemeToggle } from "@/components/common/theme-toggle";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between border-foreground/10 border-b bg-background px-10 py-4">
      <p className="font-bold text-2xl">Transaction Insights</p>
      <ThemeToggle />
    </nav>
  );
}
