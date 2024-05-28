"use client"
import { useState, useEffect } from 'react';

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"

import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function Home() {

  //TASK : useStates for the input fields
  const [employeeName, setEmployeeName] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("")
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")

  type RelationshipType = "Manager" | "Colleague" | "Client" | "Other";

  const [relationship, setRelationship] = useState<RelationshipType>("Manager");

  //DATE functions
  const formatDateString = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // months are 0-based, pad single digit months
    const day = String(date.getDate()).padStart(2, '0'); // pad single digit days
    return `${year}-${month}-${day}`;
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>, setDate: React.Dispatch<React.SetStateAction<string>>) => {
    const date = new Date(e.target.value);
    setDate(formatDateString(date));
  };

  const handleStartDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDateChange(e, setStartDate);
  };

  const handleEndDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleDateChange(e, setEndDate);
  };

  useEffect(() => {
    console.log(relationship);
    console.log(startDate);
  }, [relationship, startDate]);

  return (
    <main className="w-full max-w-3xl mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-20">
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Provide a Reference</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Help a former employee by providing a positive reference for them.
          </p>
        </div>
        <form className="space-y-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Employee Name</Label>
              <Input
                id="name"
                placeholder="Enter the employee's name"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-title">Job Title</Label>
              <Input
                id="job-title"
                placeholder="Enter the employee's job title"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="start-date">Start Date</Label>
              <Input
                id="start-date"
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end-date">End Date</Label>
              <Input
                id="end-date"
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="relationship">Relationship</Label>
            <Select value={relationship} onValueChange={(value) => setRelationship(value as RelationshipType)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Manager">Manager</SelectItem>
                <SelectItem value="Colleague">Colleague</SelectItem>
                <SelectItem value="Client">Client</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="reference">Reference</Label>
            <Textarea
              className="min-h-[150px]"
              id="reference"
              placeholder="Provide a positive reference for the employee"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="Enter your email" type="email" />
          </div>
          <div className="flex items-center space-x-2">
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
            <Button>Request OTP</Button>
          </div>
          <Button className="w-full" type="submit">
            Submit Reference
          </Button>
        </form>
      </div>
    </main>
  )
}
