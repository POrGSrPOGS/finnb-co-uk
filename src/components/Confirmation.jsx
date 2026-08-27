export default function Confirmation({
  action,
  details,
  onConfirm,
  onCancel,
}) {
  const { currentTheme } = useTheme();

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-6 ${currentTheme.className}`}
    >
      <div
        className="absolute inset-0 bg-black/60"
        onClick={onCancel}
      />

      <div className="relative w-full max-w-[420px] rounded-xl border surface p-6 shadow-2xl">
        <h2 className="text-2xl font-semibold text-theme text-center">
          Are you sure you want to {action}?
        </h2>

        <p className="mt-4 text-center text-secondary">
          {details || `Click yes to confirm you want to ${action}.`}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 rounded-lg border px-5 py-2.5 hover:opacity-80"
          >
            No
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 rounded-lg px-5 py-2.5"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
}