"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/loader/Loader";
import ProjectApiList from "@/app/api/ProjectApiList";
import BackendUrl from "@/app/api/BackendUrl";

interface PolicyData {
  id: number;
  terms_conditions: string;
  terms_conditions_pdf: string;
  cookie_policy: string;
  privacy_policy: string;
  accessibility_info: string;
  supply_chain_policy: string;
  fssai_details: string;
  policy_images: string[];
  created_at: string;
  updated_at: string;
}

function PizzaScatterBG() {
  // ✅ Correct path (no /public/)
  const PIZZA_PNGS = useMemo(() => ["/Vector.png"], []);

  const items = useMemo(() => {
    const arr: {
      x: number;
      y: number;
      size: number;
      rotate: number;
      opacity: number;
      src: string;
    }[] = [];

    const COUNT = 18;
    for (let i = 0; i < COUNT; i++) {
      arr.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 48 + Math.floor(Math.random() * 72),
        rotate: -30 + Math.random() * 60,
        opacity: 0.15 + Math.random() * 0.1, // slightly more visible
        src: PIZZA_PNGS[i % PIZZA_PNGS.length],
      });
    }
    return arr;
  }, [PIZZA_PNGS]);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
    >
      {items.map((it, idx) => (
        <img
          key={idx}
          src={it.src}
          alt=""
          className="absolute select-none"
          style={{
            left: `${it.x}%`,
            top: `${it.y}%`,
            width: `${it.size}px`,
            transform: `translate(-50%, -50%) rotate(${it.rotate}deg)`,
            opacity: it.opacity,
            filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.15))",
          }}
          loading="lazy"
        />
      ))}
    </div>
  );
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
    { label: string; content?: string; pdf?: string; images?: string[] }
  > = {
    termsConditions: {
      label: "Terms & Conditions",
      pdf: policies.terms_conditions_pdf,
      images: policies.policy_images,
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

  const handleDownload = async () => {
    if (!selected?.pdf) return;
    const response = await fetch(`${BackendUrl}/${selected.pdf}`);
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "policy.pdf"; // 👈 custom filename
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div
      className="relative min-h-screen flex items-center justify-center 
    bg-[url('/elephantPointers.png')] bg-cover bg-center
    before:absolute before:inset-0 
    before:bg-gradient-to-br before:from-orange-50 before:via-orange-100 before:opacity-80 
    px-6"
    >
      {/* 🍕 scattered pizzas layer */}
      {/* <PizzaScatterBG /> */}

      <div className="relative z-10 max-w-5xl w-full bg-white/95 p-8 rounded-2xl shadow-lg border border-orange-300">
        {selected ? (
          <div className="paper-container">
            <h2 className="text-3xl text-center font-bold mb-6 text-orange-700 underline decoration-orange-400">
              {selected.label}
            </h2>

            {selected.content && (
              <div
                className="policy-content prose prose-lg mx-auto bg-orange-50 p-6 rounded-xl shadow-md border border-orange-200"
                dangerouslySetInnerHTML={{ __html: selected.content }}
              />
            )}

            {/* {selected.pdf && (
              <div className="mt-6 text-center">
                <a
                  href={`${BackendUrl}/${selected.pdf}`}
                  // download
                  className="px-5 py-3 bg-orange-600 text-white font-semibold rounded-lg shadow hover:bg-orange-700 transition"
                >
                  Download PDF
                </a>
              </div>
            )} */}
            {selected.pdf && (
              <div className="mt-6 text-center">
                <button
                  onClick={handleDownload}
                  className="px-5 py-2 bg-orange-600 text-white font-semibold rounded-lg shadow hover:bg-orange-700 transition cursor-pointer"
                >
                  Download PDF
                </button>
              </div>
            )}
          </div>
        ) : (
          <p className="text-center text-orange-700">
            Please select a policy type from the query params.
          </p>
        )}
      </div>
    </div>
  );
}
