"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/loader/Loader";
import ProjectApiList from "@/app/api/ProjectApiList";
import BackendUrl from "@/app/api/BackendUrl";

interface PolicyData {
  id: number;
  terms_conditions: string;
  terms_conditions_pdf: string; // ✅ include PDF
  cookie_policy: string;
  privacy_policy: string;
  accessibility_info: string;
  supply_chain_policy: string;
  fssai_details: string;
  created_at: string;
  updated_at: string;
}

export default function PoliciesContent() {
  const [policies, setPolicies] = useState<PolicyData | null>(null);
  const [loading, setLoading] = useState(true);
  const { api_getPolicyData } = ProjectApiList();

  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  useEffect(() => {
    const fetchPolicies = async () => {
      try {
        const res = await fetch(api_getPolicyData);
        const json = await res.json();
        if (json.status === "success") {
          setPolicies(json.data[0]);
        }
      } catch (error) {
        console.error("Error fetching policies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolicies();
  }, [api_getPolicyData]);

  if (loading)
    return (
      <div className="fixed inset-0 z-50 h-full w-full flex items-center justify-center bg-white">
        <Loader />
      </div>
    );

  if (!policies)
    return <p className="text-center text-red-500">Failed to load policies.</p>;

  const policyMap: Record<
    string,
    { label: string; content: string; pdf?: string }
  > = {
    termsConditions: {
      label: "Terms & Conditions",
      content: policies.terms_conditions,
      pdf: policies.terms_conditions_pdf, // ✅ attach PDF
    },
    cookie: { label: "Cookie Policy", content: policies.cookie_policy },
    privacyPolicy: {
      label: "Privacy Policy",
      content: policies.privacy_policy,
    },
    accessibility: {
      label: "Accessibility Info",
      content: policies.accessibility_info,
    },
    supplyChain: {
      label: "Supply Chain Policy",
      content: policies.supply_chain_policy,
    },
    fssaiDetails: { label: "FSSAI Details", content: policies.fssai_details },
  };

  const selected = type ? policyMap[type] : null;

  return (
    <div className="max-w-5xl mx-auto p-6 mt-20">
      {selected ? (
        <div className="paper-container">
          <h2 className="text-3xl text-center font-bold mb-6 text-gray-800 underline decoration-gray-400">
            {selected.label}
          </h2>

          <div
            className="policy-content prose prose-lg mx-auto bg-white p-6 rounded-2xl shadow-md"
            dangerouslySetInnerHTML={{ __html: selected.content }}
          />

          {selected.pdf && (
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold mb-3 text-gray-700">
                Terms & Conditions (PDF)
              </h3>
              <iframe
                src={`${BackendUrl}/${selected.pdf}`}
                className="w-full h-[600px] border rounded-lg shadow"
                title="Terms & Conditions PDF"
              />
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Please select a policy type from the query params.
        </p>
      )}
    </div>
  );
}
