"use client";

import { Fragment, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { formatText } from "@/lib/formatText";

export default function ProjectGallery({ post }) {
  if (!post) {
    return <div className="container text-center py-5">Loading gallery…</div>;
  }

  const title = post?.acf?.gallery_heading || "Gallery";
  const gallery = post?.acf?.image_gallery || [];

  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);

  const images = gallery.map((item) => ({
    src: item.id,
  }));

  if (!gallery.length) {
    return <div className="container text-center py-5">No gallery images available.</div>;
  }

  return (
    <Fragment>
      <div className="row top-pad">
        <div className="col-sm-12 project-gallery mb-4">
          <p className="sub-heading">Project Gallery</p>
          <h2 dangerouslySetInnerHTML={{ __html: formatText(title) }} />
        </div>

        <div className="col-sm-12 gallery-of-project">
          <div className="masonry-grid">
            {gallery.map((img, index) => (
              <div className="masonry-item" key={img.id || index}>
                <img
                  src={img.id}
                  alt={img.title || "Project Image"}
                  className="masonry-img"
                  loading="lazy"
                  onClick={() => {
                    setStartIndex(index);
                    setOpen(true);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Lightbox open={open} close={() => setOpen(false)} slides={images} index={startIndex} />
    </Fragment>
  );
}
