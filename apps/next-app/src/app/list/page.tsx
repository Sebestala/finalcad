"use client";

import { Cell } from "@repo/ui/Cell";
import { useEffect, useState } from "react";

interface Status {
  color: string;
  enabled: boolean;
  id: string;
  name: string;
  num: number;
}

interface TableData {
  id: string;
  name: string;
  template_name: string;
  status: Status;
  due_date: string;
}

export default function ListPage(): JSX.Element {
  const [tableData, setTableData] = useState<TableData[]>([]);

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
  return (
    <div className="flex flex-col m-8 p-4 gap-10 ">
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
        {tableData.map((data) => (
          <RawData
            key={data.id}
            name={data.name}
            template_name={data.template_name}
            status={data.status}
            due_date={data.due_date}
          />
        ))}
      </ul>
    </div>
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
