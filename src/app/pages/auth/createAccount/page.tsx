// /app/pages/auth/createAccount/page.tsx
import { Suspense } from "react";
import CreateAccountPage from "./CreateAccountPage";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center p-10">Loading...</div>}>
      <CreateAccountPage />
    </Suspense>
  );
}
