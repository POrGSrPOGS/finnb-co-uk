import { teleport } from "../game/portals";

export default function Confirmation({
  details,
  demoURL,
  codeURL,
  onChosen,
}) {
  const handleChosen = (url) => {
    onChosen();

    console.log("Chosen URL:", url);

    teleport(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-6">
      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        onClick={onChosen}
      />

      {/* Menu */}
      <div className="relative w-full max-w-[420px] rounded-xl border border-cyan-400/40 bg-[#07111f] p-6 text-white shadow-2xl shadow-cyan-500/10">
        
        {/* X button */}
        <button
          onClick={onChosen}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-md text-xl text-cyan-300 transition hover:bg-cyan-400/10 hover:text-cyan-100"
          aria-label="Close"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="pr-8 text-center text-2xl font-semibold text-cyan-300">
          Portal
        </h2>

        {/* Details */}
        {details && (
          <p className="mt-4 text-center text-sm text-slate-300">
            {details}
          </p>
        )}

        {/* Buttons */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => handleChosen(demoURL)}
            className="flex-1 rounded-lg border border-cyan-400 bg-cyan-400/10 px-5 py-2.5 font-medium text-cyan-300 transition hover:bg-cyan-400 hover:text-[#07111f]"
          >
            View Demo
          </button>

          <button
            onClick={() => handleChosen(codeURL)}
            className="flex-1 rounded-lg border border-cyan-400/50 bg-[#0b1b2e] px-5 py-2.5 font-medium text-cyan-200 transition hover:border-cyan-400 hover:bg-cyan-400/10"
          >
            View Code
          </button>
        </div>
      </div>
    </div>
  );
}