"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UserPen } from "lucide-react";
import { Lexend } from "next/font/google";
import { cn } from "@/lib/utils";
import { memo, useState } from "react";
import toast from "react-hot-toast";
import { Label } from "../ui/label";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { candidateStatus } from "@/types/mainEnums";
import { usePostCandidate } from "@/hooks/database/Candidate/usePostCandidate";

const lexendFont = Lexend({
  subsets: ["latin"],
});

function AddCandidateModal() {
  const [candidateName, setCandidateName] = useState("");
  const [appliedFor, setAppliedFor] = useState("");
  const [appliedDate, setAppliedDate] = useState<Date>();
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [status, setStatus] = useState<candidateStatus>();
  const { postCandidate, isPending } = usePostCandidate();

  const handleDateChange = (newDate: Date | undefined) => {
    setAppliedDate(newDate);
  };
  const statusMap: { [key in candidateStatus]: string } = {
    [candidateStatus.selected]: "selected",
    [candidateStatus.inProcess]: "in-process",
    [candidateStatus.rejected]: "rejected",
  };

  const isPostEnable =
    candidateName &&
    appliedDate &&
    appliedFor &&
    email &&
    mobileNumber &&
    status;
  const postData = async () => {
    await toast.promise(
      postCandidate({
        candidateName,
        appliedFor,
        appliedDate: format(appliedDate as Date, "MMMM d, yyyy"),
        email,
        mobileNumber,
        candidateStatus: status as candidateStatus,
      }),
      {
        loading: "Adding...",
        success: <b>Candidate added!</b>,
        error: <b>Could not add</b>,
      }
    );
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <UserPen /> Add New Candidate
        </Button>
      </DialogTrigger>
      <DialogContent className={cn("sm:max-w-[425px]", lexendFont.className)}>
        <DialogHeader className="border-b pb-4">
          <DialogTitle>Add New Candidate</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <Label>Candidate Name</Label>
            <Input
              placeholder="Candidate Name"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
            />
          </div>
          <div>
            <Label>Applied For</Label>
            <Input
              placeholder="Applied For"
              value={appliedFor}
              onChange={(e) => setAppliedFor(e.target.value)}
            />
          </div>
          <div>
            <Label>Applied Date</Label>
            <Input
              id="date"
              type="date"
              value={appliedDate ? format(appliedDate, "yyyy-MM-dd") : ""}
              onChange={(e) =>
                handleDateChange(e.target.valueAsDate || undefined)
              }
              className="w-full"
            />
          </div>
          <div>
            <Label>Email</Label>
            <Input
              placeholder="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label>Mobile Number</Label>
            <Input
              placeholder="Mobile Number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div>
            <Label>Candidate Status</Label>
            <Select
              onValueChange={(value) => setStatus(value as candidateStatus)}
            >
              <SelectTrigger className={statusMap[status as candidateStatus]}>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem
                  value="Selected"
                  className="selected mb-1 focus:bg-[#3fc28a] focus:bg-opacity-20 focus:text-[#3fc28a]"
                >
                  Selected
                </SelectItem>
                <SelectItem
                  value="In Process"
                  className="in-process mb-1 focus:bg-[#efbe12] focus:text-[#efbe12] focus:bg-opacity-20"
                >
                  In Process
                </SelectItem>
                <SelectItem
                  value="Rejected"
                  className="rejected focus:bg-[#f45b69] focus:text-[#f45b69] focus:bg-opacity-20"
                >
                  Rejected
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter className="flex gap-2 w-full justify-center">
          <DialogClose asChild>
            <Button variant="ghost" className="border w-full py-5 font-light">
              Cancel
            </Button>
          </DialogClose>
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
export default memo(AddCandidateModal);
