// src/components/Card.tsx
import React from "react";

interface CardProps {
  title: string;
  value: string | number;
}

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div className="p-4 bg-[#2E2E2E] shadow rounded-lg">
      <h2 className="text-lg font-semibold text-white">{title}</h2>
      <p className="text-xl font-bold text-white">{value}</p>
    </div>
  );
};

export default Card;
