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

/**
 * Renders the EDL (État des Lieux) details page.
 *
 * @returns {JSX.Element} The rendered EDL details page component.
 *
 * Features:
 * - Fetches phase and creator data from API endpoints
 * - Retrieves EDL data from local storage
 */
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
      fetchPhaseName(parsedData.phase_id);
      fetchCreator(parsedData.created_by);
    }
  }, []);

  return (
    <main className="flex flex-col m-8 p-10 gap-4 bg-slate-50 rounded-2xl shadow-md">
      <h1 className="text-2xl font-medium text-slate-700">Details EDL {num}</h1>
      <div className="flex flex-col gap-10">
        <div className="flex">
          <section
            className="flex flex-col gap-2 w-full"
            aria-labelledby="phase-heading"
          >
            <h2
              id="phase-heading"
              className="flex w-full font-light text-lg text-slate-700/50 sr-only"
            >
              Phase
            </h2>
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
          </section>
        </div>
        <div className="flex">
          <section
            className="flex flex-col gap-2 w-full"
            aria-labelledby="edl-heading"
          >
            <h2
              id="edl-heading"
              className="flex w-full font-light text-lg text-slate-700/50 sr-only"
            >
              EDL
            </h2>
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
          </section>
        </div>
        <div className="flex">
          <section
            className="flex flex-col gap-2 w-full"
            aria-labelledby="creator-heading"
          >
            <h2
              id="creator-heading"
              className="flex w-full font-light text-lg text-slate-700/50 sr-only"
            >
              Creator
            </h2>
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
          </section>
        </div>
      </div>
    </main>
  );
}
