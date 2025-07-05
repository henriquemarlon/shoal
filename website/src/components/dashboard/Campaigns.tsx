import React from "react";
import { Plus } from 'lucide-react';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import VideoInput from "./VideoInput";
import CalendarField from "./CalendarFIeld";
import { VerificationBanner } from "@/components/dashboard/VerificationBanner";
import { useState } from "react";
import { Modal } from "@/components/dashboard/Modal";
import { Outlet } from "react-router-dom";

const campaigns = [
  { id: 1, percent: 2, status: "Break-even not reached" },
  { id: 2, percent: 2, status: "Break-even not reached" },
  { id: 3, percent: 2, status: "Break-even reached" },
  { id: 4, percent: 2, status: "Break-even reached" },
  { id: 5, percent: 2, status: "Break-even reached" },
  { id: 6, percent: 2, status: "Break-even reached" },
  { id: 7, percent: 2, status: "Break-even reached" },
  { id: 8, percent: 2, status: "Break-even reached" },
  { id: 9, percent: 2, status: "Break-even reached" },
];

export default function CampaignList() {
  const [verification, setVerification] = useState(false);

  return (
    <div className="flex flex-col items-center">

      {!verification && (
        <>
          <VerificationBanner verified={verification} />
          <Modal>
            <Outlet />
          </Modal>
        </>
      )}


      {verification && (
        <div>
          <Dialog>
            <div className="flex justify-end w-full">
              <DialogTrigger asChild>
                <button className="cursor-pointer flex gap-1 items-center mb-6 px-4 py-2 bg-[#FF533F] text-white rounded-lg font-medium shadow">
                  <Plus className="w-4 h-4 mr-2" />
                  Create new campaign
                </button>
              </DialogTrigger>
            </div>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create new campaign</DialogTitle>
              </DialogHeader>
              <form className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="campaign-name">Campaign name</label>
                  <input id="campaign-name" type="text" placeholder="Ex: Campaign Name" className="border rounded px-2 py-1" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="campaign-description">Description</label>
                  <textarea id="campaign-description" placeholder="Describe your campaign..." rows={4} className="border rounded-lg px-2 py-1 resize-y min-h-[80px]" />
                </div>
                <VideoInput />
                <div className="flex flex-col gap-2">
                  <label htmlFor="max-interest-rate">Max Interest Rate</label>
                  <input id="max-interest-rate" type="number" step="0.01" placeholder="Ex: 12.5" className="border rounded-lg px-2 py-1" />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="debt-issued">Debt Issued</label>
                  <input id="debt-issued" type="number" step="0.01" placeholder="Ex: 10000" className="border rounded-lg px-2 py-1" />
                </div>

                <CalendarField label="Closes At" value={undefined} setValue={() => { }} />
                <CalendarField label="Maturity At" value={undefined} setValue={() => { }} />

                <Button type="submit" className="mt-2 bg-[#FF533F] hover:bg-[#FF533F]/80 text-white cursor-pointer">Create</Button>
              </form>
            </DialogContent>
          </Dialog>

          <div className="flex w-full">
            <div className="grid grid-cols-4 gap-8 w-[100%]">

              {campaigns.map((c) => (
                <div
                  key={c.id}
                  className="w-78 border-1 border-gray-200 bg-white rounded-2xl p-6 flex flex-col items-center justify-center shadow"
                >
                  <div className="text-xl font-semibold"> Campaign Name </div>
                  <div className="text-xs text-gray-500 mb-2">Started on: 05/07/2025</div>


                  <div className="font-semibold text-sm">Raised amount:</div>
                  <div className="mb-4 text-xs text-gray-500">{c.percent}%</div>

                  <div className="font-semibold text-sm">Status:</div>
                  <div className="text-xs text-gray-500">{c.status}</div>
                </div>
              ))}

            </div>

          </div>

        </div>
      )}


    </div>
  );
} 