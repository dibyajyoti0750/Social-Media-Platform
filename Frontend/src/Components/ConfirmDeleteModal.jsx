export default function ConfirmDeleteModal({ onCancel, onAction }) {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black/50">
      <div className="flex flex-col w-full max-w-lg bg-white p-4 rounded-lg shadow-lg gap-2">
        <h2 className="text-xl font-bold text-center">Confirm delete?</h2>

        <hr className="border-gray-200" />

        <p className="text-sm text-center">
          This action is irreversible. Once deleted, the post cannot be
          recovered.
        </p>

        <div className="flex justify-end gap-2 mt-2">
          <button
            onClick={onCancel}
            className="px-8 py-2 rounded-lg text-indigo-500 cursor-pointer hover:bg-gray-200"
          >
            Cancel
          </button>

          <button
            onClick={onAction}
            className="px-8 py-2 rounded-lg bg-indigo-500 text-white cursor-pointer hover:bg-indigo-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
