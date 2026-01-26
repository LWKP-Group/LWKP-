"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import "antd/dist/reset.css";
import SmallLOGO from "@/assets/smalllogo.png";
import {
  fetchpartnershipPosts,
  selectpartnershipPosts,
  selectpartnershipLoading,
  selectpartnershipTotal,
} from "@/store/slices/partnershipSlice";

import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import PartnershipFilters from "./PartnershipFilters";
import ArchivePagination from "@/components/ReuseableComponent/Pagination";
import { rowAnim, cardAnim } from "@/lib/animation";

export default function PartnershipFilterGrid() {
  const dispatch = useDispatch();

  const partnership = useSelector(selectpartnershipPosts);
  const total = useSelector(selectpartnershipTotal);
  const loading = useSelector(selectpartnershipLoading);

  const [page, setPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState("");

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePartnership, setActivePartnership] = useState(null);

  const pageSize = 12;

  useEffect(() => {
    dispatch(fetchpartnershipPosts({ page, keyword }));
  }, [dispatch, page, keyword]);

  const handleFilter = ({ keyword, year }) => {
    setPage(1);
    setKeyword(keyword || "");
    setYear(year || "");
  };

  const filteredpartnership = useMemo(() => {
    if (!year) return partnership || [];

    return (partnership || []).filter((a) => {
      const dateStr = a?.acf?.partnership_date || "";
      return dateStr.endsWith(year);
    });
  }, [partnership, year]);

  // Modal Handlers
  const openModal = (item) => {
    setActivePartnership(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActivePartnership(null);
  };

  return (
    <>
      <motion.div className="container py-5 gridbox" variants={rowAnim} initial="hidden" whileInView="show">
        <PartnershipFilters partnership={partnership || []} onFilter={handleFilter} />

        {loading && (
          <div className="container text-center py-5">
            <GlobalLoader />
          </div>
        )}

        {!loading && filteredpartnership.length === 0 && (
          <div className="text-center py-5">
            <h4>No partnership found</h4>
          </div>
        )}

        {!loading && filteredpartnership.length > 0 && (
          <div className="row">
            {filteredpartnership.map((item, index) => {
              const title = item?.title?.rendered || "Partnership";
              const img = item?.featured_image;
              const dateStr = item?.acf?.partnership_date || "";
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

      {/* 🔹 Modal Content */}
      <Modal open={isModalOpen} onCancel={closeModal} footer={null} centered width={800}>
        {activePartnership && (
          <>
            <h3 dangerouslySetInnerHTML={{ __html: activePartnership?.title?.rendered }} />
            <div
              className="partnership-modal-content"
              dangerouslySetInnerHTML={{
                __html: activePartnership?.content?.rendered || "",
              }}
            />
          </>
        )}
      </Modal>
    </>
  );
}
