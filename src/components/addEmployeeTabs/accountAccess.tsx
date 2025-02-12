"use client";
import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  type AccountAccessFormData,
  AccountAccessSchema,
} from "@/zod_schemas/account-access-info";
import useFormStore from "@/stores/useFormStore";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { ArrowLeft, DownloadCloud } from "lucide-react";

const AccountAccessTab = ({
  goToPreviousTab,
  saveData,
  isPending,
}: {
  goToPreviousTab: () => void;
  saveData: () => void;
  isPending: boolean;
}) => {
  const { accountAccessData, setAccountAccessData } = useFormStore();
  const form = useForm<AccountAccessFormData>({
    resolver: zodResolver(AccountAccessSchema),
    defaultValues: accountAccessData,
  });

  const formValues = useWatch({ control: form.control });

  useEffect(() => {
    setAccountAccessData(formValues);
  }, [formValues]);

  return (
    <Form {...form}>
      <form
        className="space-y-6 p-1 w-screen md:w-full"
        onSubmit={form.handleSubmit(saveData)}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Email</Label>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      placeholder="Email Address"
                      type="email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Label>Slack ID</Label>
            <FormField
              control={form.control}
              name="slackID"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Slack ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div>
            <Label>Skype ID</Label>
            <FormField
              control={form.control}
              name="skypeID"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Skype ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <Label>Github ID</Label>
            <FormField
              control={form.control}
              name="githubID"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Github ID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex justify-between">
          <Button onClick={goToPreviousTab} disabled={isPending}>
            <ArrowLeft />
            previous tab
          </Button>
          <Button type="submit" disabled={isPending}>
            save <DownloadCloud />
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AccountAccessTab;
