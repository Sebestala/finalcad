"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TableData } from "../../page";
import { DataCard } from "@repo/ui/DataCard";
interface Phase {
  id: string;
  name: string;
  order: number;
}

interface Member {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
}
export default function EDLPage(): JSX.Element {
  const { num } = useParams();
  const [itemData, setItemData] = useState<TableData | null>(null);
  const [phase, setPhase] = useState<Phase | null>(null);
  const [member, setMember] = useState<Member | null>(null);

  const fetchPhaseName = async (phaseId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://demo.wizzcad.com:8081/phases`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const phases: Phase[] = await response.json();
        console.log(phases);
        const phaseFetched = phases.find((p) => p.id === phaseId);
        if (phaseFetched) {
          setPhase(phaseFetched);
        }
      }
    } catch (error) {
      console.error("Error fetching phase name:", error);
    }
  };

  const fetchCreator = async (creatorId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await fetch(`http://demo.wizzcad.com:8081/members`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const members: Member[] = await response.json();
        const member = members.find((p) => p.user_id === creatorId);
        console.log(member);
        if (member) {
          setMember(member);
        }
      }
    } catch (error) {
      console.error("Error fetching phase name:", error);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("currentEDLData");
    if (storedData) {
      const parsedData = JSON.parse(storedData) as TableData;
      setItemData(parsedData);
      console.log(parsedData);
      fetchPhaseName(parsedData.phase_id);
      fetchCreator(parsedData.created_by);
    }
  }, []);

  return (
    <div className="flex flex-col m-8 p-10 gap-4 bg-slate-50 rounded-2xl shadow-md">
      <h1 className="text-2xl font-medium text-slate-700">Details EDL {num}</h1>
      <div className="flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <p className="flex w-full font-light text-lg text-slate-700/50">Phase</p>
          <div className="grid grid-cols-2 gap-8 w-full">
            <DataCard
              label="Name"
              value={phase?.name}
            />
            <DataCard
              label="Order"
              value={phase?.order}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="flex w-full font-light text-lg text-slate-700/50">EDL</p>
          <div className="grid grid-cols-2 gap-8 w-full">
            <DataCard
              label="Name"
              value={itemData?.name}
            />
            <DataCard
              label="Template Name"
              value={itemData?.template_name}
            />
            <DataCard
              label="Status"
              value={itemData ? itemData.status.name : "N/A"}
              className={`text-sm font-normal`}
              style={{ color: itemData ? itemData.status.color : "#172134" }}
            />
            <DataCard
              label="Due Date"
              value={itemData?.due_date}
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="flex w-full font-light text-lg text-slate-700/50">Creator</p>
          <div className="grid grid-cols-2 gap-8 w-full">
            <DataCard
              label="First name"
              value={member?.first_name}
            />
            <DataCard
              label="Last name"
              value={member?.last_name}
            />
            <DataCard
              label="Email"
              value={member?.email}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
