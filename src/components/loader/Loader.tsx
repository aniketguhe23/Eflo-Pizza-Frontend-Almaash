// components/loader/Loader.tsx
"use client";

import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white flex-col">
      <img src="/loader.gif" alt="Loading..." className="w-52 h-52 object-contain" />
    </div>
  );
};

export default Loader;
