import type { AttachmentFile } from "@/types/news";

interface AttachmentDownloadListProps {
  attachments?: AttachmentFile[];
}

function formatFileSize(size?: number) {
  if (!size) return null;

  if (size < 1024 * 1024) {
    return `${Math.ceil(size / 1024)}KB`;
  }

  return `${(size / 1024 / 1024).toFixed(1)}MB`;
}

export function AttachmentDownloadList({
  attachments,
}: AttachmentDownloadListProps) {
  if (!attachments || attachments.length === 0) {
    return null;
  }

  return (
    <section className="mt-10 border-t border-[color-mix(in_srgb,var(--color-dado-dark)_16%,transparent)] pt-6">
      <h3 className="mb-4 font-sans text-xs uppercase tracking-[0.22em] text-[color-mix(in_srgb,var(--color-dado-dark)_55%,transparent)]">
        Attachments
      </h3>

      <ul className="space-y-3">
        {attachments.map((file) => {
          const sizeLabel = formatFileSize(file.size);

          return (
            <li key={`${file.url}-${file.name}`}>
              <a
                href={file.url}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="flex items-center justify-between gap-4 rounded-2xl border border-[color-mix(in_srgb,var(--color-dado-dark)_12%,transparent)] bg-white/55 px-5 py-4 font-sans text-sm text-[var(--color-dado-dark)] transition hover:border-[color-mix(in_srgb,var(--color-dado-dark)_28%,transparent)] hover:bg-white"
              >
                <span className="min-w-0 truncate">{file.name}</span>

                <span className="shrink-0 text-xs text-[color-mix(in_srgb,var(--color-dado-dark)_52%,transparent)]">
                  {sizeLabel ? `${sizeLabel} · 다운로드` : "다운로드"}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
