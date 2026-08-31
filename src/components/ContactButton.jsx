export default function ContactButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full bg-cyan-500/90 px-4 py-2 text-sm font-semibold text-blue-950 shadow-lg transition hover:bg-cyan-400"
    >
      Contact
    </button>
  );
}