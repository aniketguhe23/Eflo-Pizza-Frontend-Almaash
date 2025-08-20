import { Suspense } from "react";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PoliciesContent from "./PoliciesContent";
import Loader from "@/components/loader/Loader";

export default function PoliciesPage() {
  return (
    <>
      <Header />
      <Suspense fallback={<Loader />}>
        <PoliciesContent />
      </Suspense>
      <Footer />
    </>
  );
}
