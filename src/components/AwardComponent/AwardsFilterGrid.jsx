"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import "antd/dist/reset.css";
import SmallLOGO from "@/assets/smalllogo.png";
import {
  fetchawardsPosts,
  selectawardsPosts,
  selectawardsLoading,
  selectawardsTotal,
} from "@/store/slices/awardsSlice";

import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import AwardsFilters from "./AwardsFilters";
import ArchivePagination from "@/components/ReuseableComponent/Pagination";
import { rowAnim, cardAnim } from "@/lib/animation";

export default function AwardsFilterGrid() {
  const dispatch = useDispatch();

  const awards = useSelector(selectawardsPosts);
  const total = useSelector(selectawardsTotal);
  const loading = useSelector(selectawardsLoading);

  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("");

  // 🔹 Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeAward, setActiveAward] = useState(null);

  const pageSize = 12;

  useEffect(() => {
    dispatch(fetchawardsPosts({ page, keyword }));
  }, [dispatch, page, keyword]);

  const handleFilter = ({ keyword, year }) => {
    setPage(1);
    setKeyword(keyword || "");
    setYear(year || "");
  };

  const filteredAwards = useMemo(() => {
    if (!year) return awards || [];

    return (awards || []).filter((a) => {
      const dateStr = a?.acf?.awards_date || "";
      return dateStr.endsWith(year);
    });
  }, [awards, year]);

  // 🔹 Modal handlers
  const openModal = (award) => {
    setActiveAward(award);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveAward(null);
  };

  return (
    <>
      <motion.div className="container py-5 gridbox" variants={rowAnim} initial="hidden" whileInView="show">
        <AwardsFilters awards={awards || []} onFilter={handleFilter} />

        {loading && (
          <div className="container text-center py-5">
            <GlobalLoader />
          </div>
        )}

        {!loading && filteredAwards.length === 0 && (
          <div className="text-center py-5">
            <h4>No awards found</h4>
          </div>
        )}

        {!loading && filteredAwards.length > 0 && (
          <div className="row">
            {filteredAwards.map((award, index) => {
              const title = award?.title?.rendered || "Award";
              const img = award?.featured_image;

              const dateStr = award?.acf?.awards_date || "";
              const yearText = dateStr.split(" ").pop();

              return (
                <motion.div
                  key={award.id}
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
                  <a onClick={() => openModal(award)} style={{ cursor: "pointer" }}>
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

      {/* 🔹 ANT DESIGN MODAL */}
      <Modal open={isModalOpen} onCancel={closeModal} footer={null} centered width={800}>
        {activeAward && (
          <>
            <h3
              dangerouslySetInnerHTML={{
                __html: activeAward?.title?.rendered,
              }}
            />

            <div
              className="award-modal-content"
              dangerouslySetInnerHTML={{
                __html: activeAward?.content?.rendered || "",
              }}
            />
          </>
        )}
      </Modal>
    </>
  );
}
