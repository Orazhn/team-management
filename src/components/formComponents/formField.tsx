import { Montserrat } from "next/font/google";
import { cn } from "@/lib/utils";

const montserrat = Montserrat({ subsets: ["latin"] });

export default function FormField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="space-y-2">
      <label
        className={cn("text-sm text-muted-foreground", montserrat.className)}
      >
        {label}
      </label>
      <div className="font-medium">{value}</div>
    </div>
  );
}
