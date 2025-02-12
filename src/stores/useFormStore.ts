"use client";
import { create } from "zustand";
import { type AccountAccessFormData } from "@/zod_schemas/account-access-info";
import { type PersonalInfoFormData } from "@/zod_schemas/personal-info";
import { type ProfessionalInfoFormData } from "@/zod_schemas/professional-info";
import { format } from "date-fns";

interface FormStore {
  accountAccessData: AccountAccessFormData;
  personalInfoData: PersonalInfoFormData;
  professionalInfoData: ProfessionalInfoFormData;
  setAccountAccessData: (data: Partial<AccountAccessFormData>) => void;
  setPersonalInfoData: (data: Partial<PersonalInfoFormData>) => void;
  setProfessionalInfoData: (data: Partial<ProfessionalInfoFormData>) => void;
  resetFormData: () => void;
}

const initialState = {
  accountAccessData: {
    email: "",
    slackID: "",
    skypeID: "",
    githubID: "",
  },
  personalInfoData: {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    dateOfBirth: format(new Date(2000, 0), "yyyy-MM-dd"),
    address: "",
    city: "",
    state: "",
    zipCode: "",
    nationality: "",
    maritalStatus: "",
    gender: "",
  },
  professionalInfoData: {
    employeeId: "",
    userName: "",
    employeeType: "",
    email: "",
    departmentName: "",
    departmentId: "",
    designation: "",
    officeLocation: "",
    workingDays: [],
    joiningDate: format(new Date(), "yyyy-MM-dd"),
  },
};

const useFormStore = create<FormStore>((set) => ({
  ...initialState,

  setAccountAccessData: (data) =>
    set((state) => ({
      accountAccessData: { ...state.accountAccessData, ...data },
    })),

  setPersonalInfoData: (data) =>
    set((state) => ({
      personalInfoData: { ...state.personalInfoData, ...data },
    })),

  setProfessionalInfoData: (data) =>
    set((state) => ({
      professionalInfoData: { ...state.professionalInfoData, ...data },
    })),

  resetFormData: () => set(initialState),
}));

export default useFormStore;
