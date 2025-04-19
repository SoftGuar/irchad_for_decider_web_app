'use client';

import { UserProvider } from "../utils/userContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <UserProvider>{children}</UserProvider>;
}