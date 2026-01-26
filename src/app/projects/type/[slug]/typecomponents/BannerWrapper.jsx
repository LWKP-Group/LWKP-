import TypesBannerClient from "./TypesBannerClient";

export default function BannerWrapper({ type }) {
  if (!type) {
    return <div className="container text-center py-5">Loading banner…</div>;
  }

  return <TypesBannerClient type={type} />;
}
