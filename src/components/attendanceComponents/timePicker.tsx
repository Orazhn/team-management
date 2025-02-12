import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { Label } from "../ui/label";
import dayjs from "dayjs";

export default function TimePickerValue({
  value,
  setValue,
  variant,
}: {
  value: dayjs.Dayjs | null;
  setValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>;
  variant: "Check In" | "Check Out";
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["TimePicker"]}>
        <div className="flex flex-col gap-1 w-full">
          <Label>{variant}</Label>
          <TimePicker
            value={value}
            onChange={(newValue) => setValue(newValue)}
            className={
              "dark:bg-zinc-600 rounded-lg h-10 flex justify-center overflow-hidden text-white"
            }
            sx={{ color: "white" }}
          />
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
}
