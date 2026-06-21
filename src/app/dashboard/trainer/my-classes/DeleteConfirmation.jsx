export default function DeleteConfirmation({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#1e293b] p-6 rounded-xl w-full max-w-sm border border-slate-700">
        <h2 className="text-xl font-bold mb-4">Are you sure?</h2>
        <div className="flex gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-slate-600 rounded">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 rounded">Delete</button>
        </div>
      </div>
    </div>
  );
}