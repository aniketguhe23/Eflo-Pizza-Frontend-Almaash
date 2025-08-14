"use client";

import { Suspense } from "react";
import BuildContent from "./BuildContent";
// import HomeContent from "./HomeContent";

export default function HomePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BuildContent />
    </Suspense>
  );
}
