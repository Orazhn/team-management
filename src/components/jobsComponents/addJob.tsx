import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Circle, PlusCircle } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Lexend } from "next/font/google";
import { cn } from "@/lib/utils";
import { NumberInput } from "../ui/number-input";
import { memo, useState } from "react";
import { jobTypes } from "@/types/mainEnums";
import { default as MultiSelect } from "react-select";
import { usePostJob } from "@/hooks/database/Jobs/usePostJob";
import toast from "react-hot-toast";
import { useGetJobs } from "@/hooks/database/Jobs/useGetJobs";
import { useGetMode } from "@/providers/toggleMode";

const lexendFont = Lexend({
  subsets: ["latin"],
});
const categoryOptions = [
  { value: "Design", label: "Design" },
  { value: "Full time", label: "Full Time" },
  { value: "Remote", label: "Remote" },
  { value: "Sales", label: "Sales" },
  { value: "Developer", label: "Developer" },
  { value: "Hr", label: "HR" },
];
const colorMap: { [key in jobTypes]: string } = {
  [jobTypes.active]: "#EFBE12",
  [jobTypes.inactive]: "#F45B69",
  [jobTypes.completed]: "#3FC28A",
};

function AddJob() {
  const [salary, setSalary] = useState("");
  const [categories, setCategories] = useState<
    { label: string; value: string }[]
  >([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [jobType, setJobType] = useState<string>("");
  const handleSalaryChange = (newValue: string) => {
    setSalary(newValue);
  };
  const { postJob, isPending, isSuccess } = usePostJob();
  const { refetch } = useGetJobs();
  const theme = useGetMode();
  const isPostEnable =
    jobType && categories && title && salary && categories && location;

  const postData = async () => {
    await toast.promise(
      postJob({
        title,
        description,
        salary: +salary,
        location,
        jobType: jobType as jobTypes,
        categories: categories.map((category) => category.value),
      }),
      {
        loading: "Saving...",
        success: <b>Department added!</b>,
        error: <b>Could not add</b>,
      }
    );
    if (isSuccess) {
      refetch();
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle />
          Add New Job
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px]", lexendFont.className)}>
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Add New Job</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <Label>Job Title</Label>
            <Input
              placeholder="Enter Job Title"
              className="py-6"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <Label>Job Description</Label>
            <Input
              placeholder="Enter Job Description"
              className="py-6"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div>
            <Label>Salary Per Month</Label>
            <div className="flex items-center gap-2">
              $
              <NumberInput
                placeholder="Enter Salary"
                value={salary}
                onChange={handleSalaryChange}
                className="dark:text-white"
              />
            </div>
          </div>
          <div>
            <Label>Location</Label>
            <Select onValueChange={setLocation}>
              <SelectTrigger className="w-full py-6">
                <SelectValue
                  placeholder="Select Location"
                  className="text-gray-400"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="London">London</SelectItem>
                  <SelectItem value="New York">New York</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Job Type</Label>
            <Select onValueChange={setJobType}>
              <SelectTrigger className="w-full py-6">
                <SelectValue
                  placeholder="Select Type"
                  className="text-gray-400"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Object.values(jobTypes).map((type) => (
                    <SelectItem value={type} key={type}>
                      <div className="flex items-center space-x-2 ">
                        <Circle
                          className="h-3 w-3"
                          color={colorMap[type]}
                          fill={colorMap[type]}
                        />
                        <span>{type}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <MultiSelect
            styles={{
              menu: (styles) => ({
                ...styles,
                backgroundColor: theme == "dark" ? "black" : "",
              }),
              control: (baseStyles) => ({
                ...baseStyles,
                backgroundColor: theme == "dark" ? "black" : "white",
              }),
              option: (styles) => {
                return {
                  ...styles,
                  backgroundColor: theme == "dark" ? "#09090b" : "white",
                  color: theme == "dark" ? "white" : "black",
                  ":hover": {
                    backgroundColor: theme == "dark" ? "#27272a" : "#f1f5f9",
                  },
                };
              },
            }}
            isMulti
            options={categoryOptions}
            className="basic-multi-select text-[16px] shadow-sm rounded-xl"
            placeholder="Select Categories"
            classNamePrefix="select"
            value={categories}
            onChange={(selected) =>
              setCategories(
                selected.map((s) => ({
                  label: s.label,
                  value: s.value,
                }))
              )
            }
          />
        </div>
        <DialogFooter className="flex gap-2 w-full justify-center">
          <DialogTrigger asChild>
            <Button variant={"ghost"} className="border w-full py-5 font-light">
              Cancel
            </Button>
          </DialogTrigger>
          <DialogClose
            asChild
            disabled={!isPostEnable || isPending}
            onClick={postData}
          >
            <Button className="w-full py-5 font-light">Add</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default memo(AddJob);
