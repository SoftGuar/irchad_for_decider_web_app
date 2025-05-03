import React from "react";

interface UserComment {
  user_id: number;
  comment: string;
  rating: number; // Added rating field
  created_at: string;
}

interface UserCommentsTableProps {
  data: UserComment[];
}

const UserCommentsTable: React.FC<UserCommentsTableProps> = ({ data }) => {
  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (error) {
      return dateString;
    }
  };

  // Function to render rating stars
  const renderRating = (rating: number): React.ReactNode => {
    const maxRating = 5;
    return (
      <div className="flex items-center">
        {[...Array(maxRating)].map((_, i) => (
          <span 
            key={i} 
            className={`text-lg ${i < rating ? "text-yellow-400" : "text-gray-600"}`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-xs font-thin">({rating}/5)</span>
      </div>
    );
  };

  return (
    <div className="bg-[#1E1E1E] text-white p-6 rounded-lg w-full">
      <h2 className="text-xl font-bold mb-4 text-white">User Comments</h2>
      <div className="overflow-x-auto">
        <div className="overflow-y-auto max-h-80">
          <table className="w-full border-collapse">
            <thead className="bg-[#2E2E2E] text-[#999EA7] sticky top-0 z-10">
              <tr>
                <th className="p-3 text-left font-thin">User ID</th>
                <th className="p-3 text-left font-thin">Rating</th>
                <th className="p-3 text-left font-thin"> </th>
                <th className="p-3 text-right font-thin">Created At</th>
              </tr>
            </thead>
            <tbody>
              {data.length > 0 ? (
                data.map((comment, index) => (
                  <tr
                    key={index}
                    className="border-b border-[#3A3A3A] bg-[#252525] hover:bg-[#333]"
                  >
                    <td className="p-3 font-thin">{comment.user_id}</td>
                    <td className="p-3 font-thin">{renderRating(comment.rating)}</td>
                    <td className="p-3 font-thin">{comment.comment}</td>
                    <td className="p-3 font-thin text-right">{formatDate(comment.created_at)}</td>
                  </tr>
                ))
              ) : (
                <tr className="border-b border-[#3A3A3A] bg-[#252525]">
                  <td colSpan={4} className="p-3 text-center text-gray-400">
                    No comments available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserCommentsTable;