"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/loader/Loader";
import ProjectApiList from "@/app/api/ProjectApiList";

interface PolicyData {
  id: number;
  terms_conditions: string;
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
  const type = searchParams.get("type"); // e.g. "termsConditions", "cookie", etc.

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
  }, []);

  if (loading)
    return (
      <div className="fixed inset-0 z-50 h-full w-full flex items-center justify-center bg-white">
        <Loader />
      </div>
    );

  if (!policies)
    return <p className="text-center text-red-500">Failed to load policies.</p>;

  // Mapping between query param and actual data
  const policyMap: Record<string, { label: string; content: string }> = {
    termsConditions: {
      label: "Terms & Conditions",
      content: policies.terms_conditions,
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
    fssaiDetails: {
      label: "FSSAI Details",
      content: policies.fssai_details,
    },
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
            className="policy-content-page rounded-2xl shadow-md bg-white p-6 select-none"
            dangerouslySetInnerHTML={{ __html: selected.content }}
          />
        </div>
      ) : (
        <p className="text-center text-gray-500">
          Please select a policy type from the query params.
        </p>
      )}

      <style jsx>{`
        .policy-content-page {
          user-select: none !important;
          background: #fff;
          line-height: 1.7;
          font-size: 1rem;
        }
      `}</style>
    </div>
  );
}
