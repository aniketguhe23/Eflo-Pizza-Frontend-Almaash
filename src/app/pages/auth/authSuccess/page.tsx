import { Suspense } from "react";
import AuthSuccessClient from "./AuthSuccessClient";

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <AuthSuccessClient />
    </Suspense>
  );
}
