"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const Dashboard = dynamic(
  () => import("@/components/dashboard").then((mod) => mod.Dashboard),
  { ssr: false, loading: () => <div className="min-h-screen bg-parchment-100" /> }
);

export function ClientDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-parchment-100" />}>
      <Dashboard />
    </Suspense>
  );
}
