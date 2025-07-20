import React, { useState } from "react";
import axios from "axios";
import ProjectApiList from "@/app/api/ProjectApiList";

type SupportModalProps = {
  open: boolean;
  orderId: string;
  userId: string;
  restaurant_id: string;
  onClose: () => void;
  onSuccess: () => void;
};

const SupportModal: React.FC<SupportModalProps> = ({
  open,
  orderId,
  userId,
  restaurant_id,
  onClose,
  onSuccess,
}) => {
  const { api_createContactSupport } = ProjectApiList();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      order_id: orderId,
      user_id: userId,
      restaurant_id,
      subject,
      message,
    };

    try {
      await axios.post(api_createContactSupport, payload);
      setSubject("");
      setMessage("");
      onClose();
      onSuccess();
    } catch (error) {
      console.error("Support request failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Contact Support</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 text-xl font-bold"
          >
            X
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-4 py-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Order ID : {orderId}
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Enter subject..."
              className="mt-1 w-full px-3 py-2 border rounded-md text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 w-full px-3 py-2 border rounded-md text-sm"
              placeholder="Describe your issue or request..."
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-200 hover:bg-gray-300 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Sending..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SupportModal;
