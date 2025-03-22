// import React from "react";

// interface UserComment {
//   user_id: number;
//   comment: string;
//   created_at: string;
// }

// interface UserCommentsTableProps {
//   data: UserComment[];
// }

// const UserCommentsTable: React.FC<UserCommentsTableProps> = ({ data }) => {
//   return (
//     <div className="bg-[#2E2E2E] text-white p-6 rounded-lg w-full max-w-4xl mx-auto">
//       <h2 className="text-xl font-bold mb-4">User Comments</h2>
      
//       <div className="overflow-x-auto">
//         <table className="w-full border-collapse border border-gray-900">
//           <thead className="bg-gray-800">
//             <tr>
//               <th className="p-3 text-left border border-gray-900">user_id</th>
//               <th className="p-3 text-left border border-gray-900">comment</th>
//               <th className="p-3 text-left border border-gray-900">created_at</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((comment, index) => (
//               <tr key={index} className="border border-gray-900">
//                 <td className="p-3 border border-gray-900">{comment.user_id}</td>
//                 <td className="p-3 border border-gray-700">{comment.comment}</td>
//                 <td className="p-3 border border-gray-700">{comment.created_at}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default UserCommentsTable;
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
    <div className="bg-[#1E1E1E] text-white p-6 rounded-lg w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4 text-[#F5A623]">User Comments</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-[#3A3A3A]">
          <thead className="bg-[#2E2E2E] text-white">
            <tr>
              <th className="p-3 text-left border border-[#3A3A3A]">User ID</th>
              <th className="p-3 text-left border border-[#3A3A3A]">Comment</th>
              <th className="p-3 text-left border border-[#3A3A3A]">Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((comment, index) => (
              <tr key={index} className="border border-[#3A3A3A] bg-[#252525] hover:bg-[#333]">
                <td className="p-3 border border-[#3A3A3A]">{comment.user_id}</td>
                <td className="p-3 border border-[#3A3A3A]">{comment.comment}</td>
                <td className="p-3 border border-[#3A3A3A]">{comment.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserCommentsTable;
