// src/components/Table.tsx
import React from "react";

interface TableProps {
  title: string;
  headers: string[];
  data: (string | number)[][];
}

const Table: React.FC<TableProps> = ({ title, headers, data }) => {
  return (
    <div className="mt-6 bg-[#181818] p-4 shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-3 text-gray-300">{title}</h2>
      <table className="w-full border-collapse border border-[#242424]">
        <thead>
          <tr className="bg-[#121212]">
            {headers.map((header, index) => (
              <th key={index} className="border border-[#242424] px-4 py-2 text-left text-gray-400">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index} className="text-center bg-[#1E1E1E] hover:bg-[#242424] transition">
              {row.map((cell, i) => (
                <td key={i} className="border border-[#242424] px-4 py-2 text-gray-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
