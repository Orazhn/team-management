import { Header } from "@/components/header";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import QueryProvider from "@/providers/queryProvider";
import { Toaster } from "react-hot-toast";

export default function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <main className="flex">
        <QueryProvider>
          <AppSidebar />
          <div>
            <Header />
            {children}
          </div>
        </QueryProvider>
        <Toaster />
      </main>
    </SidebarProvider>
  );
}
