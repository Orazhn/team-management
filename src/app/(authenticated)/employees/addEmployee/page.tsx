"use client";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import PersonalTab from "@/components/addEmployeeTabs/personal";
import ProfessionalTab from "@/components/addEmployeeTabs/professional";
import AccountAccessTab from "@/components/addEmployeeTabs/accountAccess";
import { useState } from "react";
import useFormStore from "@/stores/useFormStore";
import { usePostEmployee } from "@/hooks/database/Employee/usePostEmployee";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import TabList from "@/components/addEmployeeTabs/tabList";

const tabs = ["personal", "professional", "access"];
export default function PersonalInfoForm() {
  const {
    personalInfoData,
    professionalInfoData,
    accountAccessData,
    resetFormData,
  } = useFormStore();
  const [activeTab, setActiveTab] = useState("personal");
  const { postEmployee, isPending } = usePostEmployee();
  const { push } = useRouter();

  const postData = async () => {
    try {
      toast.promise(
        postEmployee({
          personalInfoData: {
            ...personalInfoData,
            employeeId: professionalInfoData.employeeId,
          },
          professionalInfoData: {
            ...professionalInfoData,
            employeeId: professionalInfoData.employeeId,
          },
          accountAccessData: {
            ...accountAccessData,
            employeeId: professionalInfoData.employeeId,
          },
        }),
        {
          loading: "Adding Employee...",
          success: <b>Employee added!</b>,
          error: <b>Could not add</b>,
        }
      );
      push("/employees");
      resetFormData();
    } catch (error) {
      console.error("Error adding Employee:", error);
    }
  };

  const goToNextTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    setActiveTab(tabs[currentIndex + 1]);
  };
  const goToPreviousTab = () => {
    const currentIndex = tabs.indexOf(activeTab);
    setActiveTab(tabs[currentIndex - 1]);
  };

  return (
    <div className="w-screen overflow-hidden md:p-6 border rounded-xl mt-6  ">
      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value)}
        className=" md:block flex items-center justify-center flex-col"
      >
        <TabList />

        <TabsContent value="personal">
          <PersonalTab goToNextTab={goToNextTab} />
        </TabsContent>
        <TabsContent value="professional">
          <ProfessionalTab
            goToNextTab={goToNextTab}
            goToPreviousTab={goToPreviousTab}
          />
        </TabsContent>
        <TabsContent value="access">
          <AccountAccessTab
            goToPreviousTab={goToPreviousTab}
            saveData={postData}
            isPending={isPending}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
