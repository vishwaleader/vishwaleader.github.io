import { Suspense } from "react";
import MemberClientPage from "./member-client";
import { cookies } from "next/headers";



export default async function Page() {
  await cookies();
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-white"></div>}>
      <MemberClientPage />
    </Suspense>
  );
}
