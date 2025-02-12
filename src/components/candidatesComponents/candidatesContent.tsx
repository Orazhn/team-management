"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetCandidates } from "@/hooks/database/Candidate/useGetCandidates";
import { useSearch } from "@/hooks/logic/useSearch";
import { AddCandidateModal } from "./addCandidate";
import { Skeleton } from "../ui/skeleton";
import { Badge } from "../ui/badge";
import { candidateStatus } from "@/types/mainEnums";
import NoDataFound from "../noDataFound";

const candidateHeads = [
  "Candidate Name",
  "Applied For",
  "Applied Date",
  "Email Address",
  "Mobile Number",
  "Status",
];
const statusMap: { [key in candidateStatus]: string } = {
  [candidateStatus.inProcess]: "in-process",
  [candidateStatus.rejected]: "rejected",
  [candidateStatus.selected]: "selected",
};

const CandidatesContent = () => {
  const { candidates, isPending } = useGetCandidates();
  const { searchData, onChange, value } = useSearch(
    candidates,
    "candidateName"
  );
  if (isPending) {
    return (
      <div className="">
        <header className="flex justify-between items-center sm:flex-col md:flex-row gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Skeleton className="h-10 w-[300px] rounded-md" />
          </div>
          <Skeleton className="h-10 w-[150px] rounded-md" />
        </header>
        <div className="overflow-auto md:ml-0 sm:left-0 sm:mt-20 sm:absolute md:static md:mt-8 h-[700px] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {Array.from({ length: 6 }).map((_, index) => (
                  <TableHead key={index} className="w-[80px]">
                    <Skeleton className="h-4 w-full" />
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {Array.from({ length: 6 }).map((_, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Skeleton className="h-4 w-24" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-32" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-20" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-4 w-28" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-md" />
                  </TableCell>
                  <TableCell>
                    <Skeleton className="h-6 w-20 rounded-md" />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }

  return (
    <div>
      <header className="flex justify-between items-center sm:flex-col md:flex-row gap-2">
        <div className="relative ">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Search"
            className="pl-10 w-[300px]"
            value={value}
            onChange={onChange}
          />
        </div>
        <AddCandidateModal />
      </header>
      <div className="overflow-auto md:ml-0 sm:left-0 sm:mt-20 sm:absolute md:static md:mt-8 h-[700px] overflow-y-auto">
        {searchData?.length ? (
          <Table>
            <TableHeader>
              <TableRow>
                {candidateHeads.map((head) => (
                  <TableHead key={head} className="w-[120px] ">
                    {head}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {searchData.map((candidate, index) => (
                <TableRow key={index}>
                  <TableCell>{candidate.candidateName}</TableCell>
                  <TableCell>{candidate.appliedFor}</TableCell>
                  <TableCell>{candidate.appliedDate}</TableCell>
                  <TableCell>{candidate.email}</TableCell>
                  <TableCell>{candidate.mobileNumber}</TableCell>
                  <TableCell>
                    <Badge
                      className={
                        statusMap[candidate.candidateStatus as candidateStatus]
                      }
                    >
                      {candidate.candidateStatus}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <NoDataFound name="Candidates" />
        )}
      </div>
    </div>
  );
};

export default CandidatesContent;
