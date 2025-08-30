export default function ConfirmDeleteModal({ onCancelDelete, onAction }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-white/20 backdrop-blur-xs">
      <div className="flex flex-col w-full max-w-lg bg-neutral-900 border border-neutral-800 p-4 rounded-xl shadow-lg gap-3">
        <h2 className="text-xl font-bold text-center text-white">
          Confirm delete?
        </h2>

        <hr className="border-neutral-700" />

        <p className="text-sm text-center text-gray-300">
          This action is irreversible. Once deleted, the post cannot be
          recovered.
        </p>

        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={onCancelDelete}
            className="px-8 py-2 rounded-lg text-sky-500 cursor-pointer hover:bg-neutral-800"
          >
            Cancel
          </button>

          <button
            onClick={onAction}
            className="px-8 py-2 rounded-lg bg-red-600 text-white cursor-pointer hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
