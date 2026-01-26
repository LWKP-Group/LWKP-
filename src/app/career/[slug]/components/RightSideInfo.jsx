import { formatText } from "@/lib/formatText";

export default function RightSideInfo({ job }) {
  if (!job) {
    return <div className="job-info text-center py-4">Loading details…</div>;
  }

  return (
    <div className="job-info">
      <p className="job-description">{job?.acf?.description || "Description not available."}</p>

      <div
        className="wysiwyg-text"
        dangerouslySetInnerHTML={{
          __html: job?.acf?.responisiblities_ || "<p>Responsibilities not available.</p>",
        }}
      />

      <div
        className="wysiwyg-text job-note"
        dangerouslySetInnerHTML={{
          __html: job?.acf?.note ? formatText(job?.acf?.note) : "<p>Note not available.</p>",
        }}
      />
    </div>
  );
}
