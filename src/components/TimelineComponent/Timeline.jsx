"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "antd";
import { fetchtimelinePosts, selecttimelinePosts, selecttimelineLoading, selecttimelineTotal } from "@/store/slices/timelineSlice";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";

export default function Timeline() {
  const dispatch = useDispatch();

  const posts = useSelector(selecttimelinePosts);
  const loading = useSelector(selecttimelineLoading);
  const total = useSelector(selecttimelineTotal);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchtimelinePosts({ page: 1 }));
  }, [dispatch]);

  if (loading && (!posts || posts.length === 0)) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!posts || posts.length === 0) return null;

  const sortedPosts = [...posts].sort((a, b) => {
    const yearA = Number(a?.acf?.timeline_journey) || 0;
    const yearB = Number(b?.acf?.timeline_journey) || 0;
    return yearA - yearB;
  });

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    dispatch(fetchtimelinePosts({ page: nextPage }));
  };

  return (
    <motion.div className="container timelines top-pad bottom-pad" variants={rowAnim} initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }}>
      {sortedPosts.map(item => {
        const year = item?.acf?.timeline_journey;
        const title = item?.title?.rendered;
        const description = item?.acf?.timeline_description;

        return (
          <div className="row timeline-row" key={item.id}>
            <span className="timeline-marker"></span>

            <div className="col-sm-2 year">
              <p>{year}</p>
            </div>

            <div className="col-sm-10 timeline-content">
              <h5 dangerouslySetInnerHTML={{ __html: title }} />
              <p>{description}</p>
            </div>
          </div>
        );
      })}

      {posts.length < total && (
        <div className="text-center mt-5">
          <Button type="primary" loading={loading} onClick={handleLoadMore}>
            Load More
          </Button>
        </div>
      )}
    </motion.div>
  );
}
