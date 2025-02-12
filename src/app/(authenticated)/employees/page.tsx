import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";
import EmployeesContent from "@/components/employeesComponents/employeesContent";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function EmployeeDashboard() {
  return (
    <div className={cn("p-6 space-y-6", montserrat.className)}>
      <EmployeesContent />
    </div>
  );
}
