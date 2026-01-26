import { Fragment } from "react";

export default function LeftSideInfo({ job }) {
  if (!job) {
    return <div className="job-left-card position-sticky top-0 text-center py-4">Loading details…</div>;
  }

  return (
    <Fragment>
      <div className="job-left-card position-sticky top-0">
        <h2>Career</h2>

        <h4>All Vacancies</h4>
        <p>{job?.title?.rendered || "Title not available"}</p>

        <h4>Disciplines</h4>
        <p>{job?.acf?.decipline || "Not specified"}</p>

        <h4>Location</h4>
        <p>{job?.acf?.location || "Not specified"}</p>
      </div>
    </Fragment>
  );
}
