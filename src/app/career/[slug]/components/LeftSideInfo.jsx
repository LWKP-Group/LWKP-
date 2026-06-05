import { Fragment } from "react";
import { useSelector } from "react-redux";

export default function LeftSideInfo({ job }) {
  if (!job) {
    return <div className="job-left-card position-sticky top-0 text-center py-4">Loading details…</div>;
  }
  const lang = useSelector((state) => state.language.currentLanguage);

  return (
    <Fragment>
      <div className="job-left-card position-sticky top-0">
        <h2> {lang === "ch" ? "职业" : "Career"}</h2>

        <h4>{lang === "ch" ? "所有职位空缺 " : "All Vacancies "}</h4>
        <p>{job?.title?.rendered || "Title not available"}</p>

        <h4> {lang === "ch" ? "学科" : "Disciplines"}</h4>
        <p>{job?.acf?.decipline || "Not specified"}</p>

        <h4> {lang === "ch" ? "位置" : "Location"}</h4>
        <p>{job?.acf?.location || "Not specified"}</p>
      </div>
    </Fragment>
  );
}
