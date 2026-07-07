import AdminClientPage from "./admin-client";
import { Suspense } from "react";
import { cookies } from "next/headers";



export default async function Page() {
  await cookies();
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AdminClientPage />
    </Suspense>
  );
}
