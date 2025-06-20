import { ChevronDown } from "lucide-react";

export default function FilterButtons() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 ">
      <div className="flex gap-4 justify-center flex-wrap">
        <button className="h-10 px-6 bg-white border border-gray-400 rounded-xl flex items-center gap-1 hover:bg-gray-100">
          Order Now <ChevronDown className="w-4 h-4" />
        </button>
        <button className="h-10 px-6 bg-white border border-gray-400 rounded-xl hover:bg-gray-100">
          Open Now
        </button>
        <button className="h-10 px-6 bg-white border border-gray-400 rounded-xl hover:bg-gray-100">
          Newly Open
        </button>
      </div>
    </div>
  );
}
