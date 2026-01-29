"use client";

import Image from "next/image";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchStoryCategories,
  selectStoryCategories,
  selectStoryCategoriesLoading,
  selectStoryCategoriesTotal,
} from "@/store/slices/storyCategorySlice";

import ArchivePagination from "@/components/ReuseableComponent/Pagination";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";

export default function StoryArchives() {
  const dispatch = useDispatch();

  const categories = useSelector(selectStoryCategories) || [];
  const loading = useSelector(selectStoryCategoriesLoading);
  const total = useSelector(selectStoryCategoriesTotal) || 0;

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchStoryCategories({ page }));
  }, [dispatch, page]);

  if (loading && categories.length === 0) {
    return <div className="container text-center py-5">Loading…</div>;
  }

  if (!loading && categories.length === 0) {
    return null;
  }

  return (
    <Fragment>
      <div className="container story-boxes">
        {categories.map((cat) => {
          const { id, name, slug, description, image } = cat;

          // ⬇ IMPORTANT: Pass ID in query param
          const link = `/stories/category/${slug}?id=${id}`;

          return (
            <motion.div
              key={id}
              id={slug}
              className="row story-box align-items-center"
              variants={rowAnim}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
            >
              <div className="col-sm-6">
                {image && (
                  <Image
                    src={image}
                    alt={name}
                    width={600}
                    height={450}
                    className="img-fluid story-img"
                    loading="lazy"
                  />
                )}
              </div>
              <div className="col-sm-6 right-side-box">
                {name && <h4>{name}</h4>}

                {description && (
                  <div
                    className="wysiwyg-text"
                    dangerouslySetInnerHTML={{
                      __html: description,
                    }}
                  />
                )}

                <Link href={link} className="story-link">
                  VIEW STORIES →
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>

      {total > 10 && (
        <ArchivePagination
          current={page}
          pageSize={10}
          total={total}
          onChange={(p) => {
            setPage(p);
            window.scrollTo({ top: 200, behavior: "smooth" });
          }}
        />
      )}
    </Fragment>
  );
}
