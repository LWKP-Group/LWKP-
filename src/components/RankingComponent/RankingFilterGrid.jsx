"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRankingYears,
  fetchrankingPosts,
  selectrankingPosts,
  selectrankingTotal,
  selectrankingLoading,
} from "@/store/slices/rankingSlice";

import { motion } from "framer-motion";
import { rowAnim, cardAnim } from "@/lib/animation";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import RankingFilters from "./RankingFilters";
import ArchivePagination from "@/components/ReuseableComponent/Pagination";
import Image from "next/image";
import SmallLOGO from "@/assets/smalllogo.png";
import { Modal } from "antd";

export default function RankingFilterGrid() {
  const dispatch = useDispatch();
  const ranking = useSelector(selectrankingPosts);
  const total = useSelector(selectrankingTotal);
  const loading = useSelector(selectrankingLoading);

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ keyword: "", year: "" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRank, setActiveRank] = useState(null);

  const pageSize = 12;

  useEffect(() => {
    dispatch(fetchRankingYears());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchrankingPosts({ page, ...filters }));
  }, [dispatch, page, filters]);

  const sortedRanking = useMemo(() => {
    return [...ranking].sort((a, b) => {
      const aDate = new Date(a?.date_gmt || a?.date || a?.modified_gmt);
      const bDate = new Date(b?.date_gmt || b?.date || b?.modified_gmt);
      return bDate - aDate;
    });
  }, [ranking]);

  console.log(sortedRanking);

  const handleFilter = ({ keyword, year }) => {
    setPage(1);
    setFilters({ keyword, year });
  };

  const openModal = (item) => setActiveRank(item) || setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false) || setActiveRank(null);

  return (
    <>
      <motion.div className="container py-5 gridbox" variants={rowAnim} initial="hidden" whileInView="show">
        <RankingFilters onFilter={handleFilter} />

        {loading && (
          <div className="text-center py-5">
            <GlobalLoader />
          </div>
        )}

        {!loading && sortedRanking.length === 0 && (
          <div className="text-center py-5">
            <h4>No ranking found</h4>
          </div>
        )}

        {!loading && sortedRanking.length > 0 && (
          <div className="row">
            {sortedRanking.map((item, index) => {
              const title = item?.title?.rendered;
              const img = item?.featured_image;
              const dateStr = item?.acf?.ranking_date || "";
              const yearText = dateStr.split(" ").pop();

              return (
                <motion.div
                  key={item.id}
                  custom={index}
                  variants={cardAnim}
                  initial="hidden"
                  animate="show"
                  whileHover={{ scale: 0.95 }}
                  className="col-sm-4 mb-4 award-box"
                >
                  <div className="awards-image-box">
                    {img ? (
                      <Image src={img} width={600} height={400} alt={title} unoptimized />
                    ) : (
                      <Image src={SmallLOGO} width={100} height={100} alt="No Image" />
                    )}
                  </div>

                  <h5 dangerouslySetInnerHTML={{ __html: title }} />
                  {yearText && <h6>{yearText}</h6>}
                  <a onClick={() => openModal(item)} style={{ cursor: "pointer" }}>
                    View More →
                  </a>
                </motion.div>
              );
            })}
          </div>
        )}

        {!loading && total > pageSize && (
          <ArchivePagination
            current={page}
            pageSize={pageSize}
            total={total}
            onChange={(p) => {
              setPage(p);
              window.scrollTo({ top: 200, behavior: "smooth" });
            }}
          />
        )}
      </motion.div>

      <Modal open={isModalOpen} onCancel={closeModal} footer={null} centered width={800}>
        {activeRank && (
          <>
            <h3 dangerouslySetInnerHTML={{ __html: activeRank?.title?.rendered }} />
            <div dangerouslySetInnerHTML={{ __html: activeRank?.content?.rendered || "" }} />
          </>
        )}
      </Modal>
    </>
  );
}
