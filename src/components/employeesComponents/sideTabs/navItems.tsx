import { User, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dispatch, ReactNode, SetStateAction } from "react";
type activeSides = "profile" | "attendance";
export default function NavItems({
  activeSide,
  setActiveSide,
}: {
  activeSide: string;
  setActiveSide: Dispatch<SetStateAction<activeSides>>;
}) {
  const navigations: {
    icon: ReactNode;
    text: string;
    label: activeSides;
  }[] = [
    {
      icon: <User className="w-4 h-4 mr-2" />,
      text: "Profile",
      label: "profile",
    },
    {
      icon: <Calendar className="w-4 h-4 mr-2" />,
      text: "Attendance",
      label: "attendance",
    },
  ];
  return (
    <div className="p-2 ">
      {navigations.map((nav) => (
        <Button
          key={nav.text}
          onClick={() => setActiveSide(nav.label)}
          variant={activeSide === nav.label ? "secondary" : "ghost"}
          className={`w-full justify-start ${
            activeSide === nav.label
              ? "bg-[#8B5CF6] text-white hover:bg-[#7C3AED]"
              : ""
          }`}
        >
          {nav.icon}
          {nav.text}
        </Button>
      ))}
    </div>
  );
}
