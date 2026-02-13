"use client";
import { Fragment } from "react";

function convertYoutubeToIframe(content) {
  if (!content) return "";

  return (
    content
      // youtu.be short link support
      .replace(
        /https?:\/\/(?:www\.)?youtu\.be\/([a-zA-Z0-9_-]+)/g,
        (_, videoId) => `
        <iframe
          width="100%"
          height="450"
          src="https://www.youtube.com/embed/${videoId}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      `,
      )

      // youtube.com/watch?v= link support
      .replace(
        /https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]+)/g,
        (_, videoId) => `
        <iframe
          width="100%"
          height="450"
          src="https://www.youtube.com/embed/${videoId}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      `,
      )
  );
}

export default function ProjectMap({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading map…</div>;
  }
  let map = post?.acf?.map_iframe || "";
  if (!map) {
    return <div className="container text-center py-5"></div>;
  }
  map = convertYoutubeToIframe(map);
  return (
    <Fragment>
      <div className="row top-pad single-insight-row">
        <div
          className="col-sm-12 project-map"
          dangerouslySetInnerHTML={{
            __html: map,
          }}
        />
      </div>
    </Fragment>
  );
}
