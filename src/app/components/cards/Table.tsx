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

      <div className="overflow-x-auto">
        <table className="w-full border-separate border-spacing-0">
          <thead>
            <tr className="bg-[#121212]">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`border border-[#242424] px-4 py-2 text-gray-400 ${
                    index === 1 ? "text-right" : "text-left"
                  }`}
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
        </table>

        {/* Scrollable body limited to 6 rows */}
        <div className="max-h-[18rem] overflow-y-auto">
          <table className="w-full border-separate border-spacing-0">
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex} className="bg-[#1E1E1E] hover:bg-[#242424] transition">
                  {row.map((cell, colIndex) => (
                    <td
                      key={colIndex}
                      className={`border border-[#242424] px-4 py-2 text-gray-300 ${
                        colIndex === 1 ? "text-right font-mono" : "text-left"
                      }`}
                    >
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Table;
