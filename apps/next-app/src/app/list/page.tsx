"use client";

import { Button } from "@repo/ui/Button";
import { Cell } from "@repo/ui/Cell";
import { useEffect, useState } from "react";
import Link from "next/link";

export interface Status {
  color: string;
  enabled: boolean;
  id: string;
  name: string;
  num: number;
}

export interface TableData {
  id: string;
  name: string;
  template_name: string;
  status: Status;
  due_date: string;
  num: number;
  phase_id: string;
  created_by: string;
}

const ITEMS_PER_PAGE = 10;

export default function ListPage(): JSX.Element {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchData = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      console.error("Token not found");
      // toast({
      //   title: "Error",
      //   description: "Token not find",
      //   variant: "destructive",
      // });
      return;
    }

    try {
      const response = await fetch(`http://demo.wizzcad.com:8081/${token}`);
      if (response.ok) {
        const data = await response.json();
        setTableData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // toast({
      // title: "Error",
      // description: "Error fetching data",
      // variant: "destructive",
      // });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const pageCount = Math.ceil(tableData.length / ITEMS_PER_PAGE);
  const paginatedData = tableData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="flex flex-col m-8 p-4 gap-10 ">
      <div className="flex flex-col ">
        <h1 className="text-2xl font-medium">Page title</h1>
        <p className="text-base font-normal text-[#848F9D]">
          Page description goes here. It can be either long or short.
        </p>
      </div>
      <ul className="rounded-lg border border-[#F4F6F8]">
        <li>
          <div className="flex w-full">
            <Cell
              label="name"
              isHeader
            />
            <Cell
              label="template_name"
              isHeader
            />
            <Cell
              label="status"
              isHeader
            />
            <Cell
              label="due_date"
              isHeader
            />
          </div>
        </li>
        {paginatedData.map((data) => (
          <Link
            href={`/list/edl/${data.num}`}
            key={data.id}
            passHref
            onClick={() => {
              localStorage.setItem("currentEDLData", JSON.stringify(data));
            }}
          >
            <RawData
              key={data.id}
              name={data.name}
              template_name={data.template_name}
              status={data.status}
              due_date={data.due_date}
            />
          </Link>
        ))}
      </ul>
      <div className="flex justify-center items-center mt-4 gap-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-[#FF8029] hover:bg-[#FF8029] w-24 text-sm text-white disabled:bg-gray-300"
          aria-label="Previous page"
        >
          Previous
        </Button>
        <span>
          Page {currentPage} / {pageCount}
        </span>
        <Button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
          disabled={currentPage === pageCount}
          className="bg-[#FF8029] hover:bg-[#FF8029] w-24 text-sm text-white disabled:bg-gray-300"
          aria-label="Next page"
        >
          Next
        </Button>
      </div>
    </main>
  );
}

interface RawDataProps {
  name: string;
  template_name: string;
  status: Status;
  due_date: string;
}

function RawData({ name, template_name, status, due_date }: RawDataProps) {
  return (
    <li>
      <div className="flex w-full">
        <Cell
          label={name}
          isBold
        />
        <Cell label={template_name} />
        <Cell
          label={status.name}
          colorText={status.color}
        />
        <Cell label={due_date} />
      </div>
    </li>
  );
}
