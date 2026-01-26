"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import "antd/dist/reset.css";
import SmallLOGO from "@/assets/smalllogo.png";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import {
  fetchrankingPosts,
  selectrankingPosts,
  selectrankingLoading,
  selectrankingTotal,
} from "@/store/slices/rankingSlice";

import RankingFilters from "./RankingFilters";
import ArchivePagination from "@/components/ReuseableComponent/Pagination";
import { rowAnim, cardAnim } from "@/lib/animation";

export default function RankingFilterGrid() {
  const dispatch = useDispatch();

  const ranking = useSelector(selectrankingPosts);
  const total = useSelector(selectrankingTotal);
  const loading = useSelector(selectrankingLoading);

  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeRank, setActiveRank] = useState(null);

  const pageSize = 12;

  useEffect(() => {
    dispatch(fetchrankingPosts({ page, keyword }));
  }, [dispatch, page, keyword]);

  const handleFilter = ({ keyword, year }) => {
    setPage(1);
    setKeyword(keyword || "");
    setYear(year || "");
  };

  const filteredranking = useMemo(() => {
    if (!year) return ranking || [];
    return (ranking || []).filter((a) => {
      const dateStr = a?.acf?.ranking_date || "";
      return dateStr.endsWith(year);
    });
  }, [ranking, year]);

  // Modal Handlers
  const openModal = (item) => {
    setActiveRank(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveRank(null);
  };

  return (
    <>
      <motion.div className="container py-5 gridbox" variants={rowAnim} initial="hidden" whileInView="show">
        <RankingFilters ranking={ranking || []} onFilter={handleFilter} />

        {loading && (
          <div className="container text-center py-5">
            <GlobalLoader />
          </div>
        )}

        {!loading && filteredranking.length === 0 && (
          <div className="text-center py-5">
            <h4>No ranking found</h4>
          </div>
        )}

        {!loading && filteredranking.length > 0 && (
          <div className="row">
            {filteredranking.map((item, index) => {
              const title = item?.title?.rendered || "Ranking";
              const img = item?.featured_image;
              const dateStr = item?.acf?.ranking_date || "";
              const yearText = dateStr;

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
                      <Image
                        src={img}
                        width={600}
                        height={400}
                        className="img-fluid"
                        alt={title}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 600px"
                        unoptimized
                      />
                    ) : (
                      <Image
                        src={SmallLOGO}
                        className="non-photo"
                        width={600}
                        height={400}
                        alt={title}
                        loading="lazy"
                        sizes="(max-width: 768px) 100vw, 600px"
                      />
                    )}
                  </div>

                  <h5 dangerouslySetInnerHTML={{ __html: title }} />
                  {yearText && <h6>{yearText}</h6>}

                  {/* 🔹 Learn More opens modal */}
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

      {/* 🔹 Modal */}
      <Modal open={isModalOpen} onCancel={closeModal} footer={null} centered width={800}>
        {activeRank && (
          <>
            <h3 dangerouslySetInnerHTML={{ __html: activeRank?.title?.rendered }} />
            <div
              className="ranking-modal-content"
              dangerouslySetInnerHTML={{
                __html: activeRank?.content?.rendered || "",
              }}
            />
          </>
        )}
      </Modal>
    </>
  );
}
