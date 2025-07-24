interface CancelOrderDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  orderId: string;
}

export default function CancelOrderDialog({ open, onClose, onConfirm, orderId }: CancelOrderDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-2">Cancel Order #{orderId}</h2>
        <p className="text-gray-700 mb-6">Are you sure you want to cancel this order?</p>

        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold rounded border border-gray-300 text-gray-700 hover:bg-gray-100"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-semibold rounded bg-red-600 text-white hover:bg-red-700"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
