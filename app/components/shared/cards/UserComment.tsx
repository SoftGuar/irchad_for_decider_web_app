import React from "react";

interface UserComment {
  user_id: number;
  comment: string;
  created_at: string;
}

interface UserCommentsTableProps {
  data: UserComment[];
}

const UserCommentsTable: React.FC<UserCommentsTableProps> = ({ data }) => {
  return (
    <div className="bg-[#1E1E1E] text-white p-6 rounded-lg w-full  ">
      <h2 className="text-xl font-bold mb-4 text-white">User Comments</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-[#2E2E2E] text-[#999EA7] font-thin">
            <tr>
              <th className="p-3 text-left  font-thin  ">User ID</th>
              <th className="p-3 text-left font-thin">Comment</th>
              <th className="p-3 text-left font-thin">Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((comment, index) => (
              <tr key={index} className="border-b border-[#3A3A3A] bg-[#252525] hover:bg-[#333]">
                <td className="p-3 font-thin">{comment.user_id}</td>
                <td className="p-3 font-thin">{comment.comment}</td>
                <td className="p-3 font-thin">{comment.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserCommentsTable;
