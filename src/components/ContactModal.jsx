export default function ContactModal({ links, onChosen }) {
  return (
    <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60">
      <div className="mx-4 w-full max-w-sm rounded-2xl border border-cyan-400/30 bg-blue-950/95 p-6 text-center shadow-2xl">
        <h2 className="mb-1 text-2xl font-bold text-cyan-300">Get In Touch</h2>

        <p className="mb-6 text-sm text-cyan-100/80">
          Thanks for exploring — here's how to reach me.
        </p>

        <div className="flex flex-col gap-3">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target={link.url.startsWith("mailto:") ? undefined : "_blank"}
              rel="noreferrer"
              className="rounded-xl bg-cyan-500/10 px-4 py-3 font-medium text-cyan-200 transition hover:bg-cyan-500/20"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          onClick={onChosen}
          className="mt-6 text-sm text-cyan-100/60 underline underline-offset-4 hover:text-cyan-100"
        >
          Close
        </button>
      </div>
    </div>
  );
}