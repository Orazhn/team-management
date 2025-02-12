import { Button } from "@/components/ui/button";
export function TabButton({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Button
      variant="ghost"
      onClick={onClick}
      className={`shrink-0 rounded-none ${
        active
          ? "text-[#8B5CF6] border-b-2 border-[#8B5CF6] rounded-none font-bold hover:text-[#8B5CF6]"
          : "text-muted-foreground"
      }`}
    >
      {icon}
      <p className="sm:hidden md:block">{label}</p>
    </Button>
  );
}
