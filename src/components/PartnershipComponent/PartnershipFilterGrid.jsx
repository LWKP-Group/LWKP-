"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchPartnershipYears,
  fetchpartnershipPosts,
  selectpartnershipPosts,
  selectpartnershipTotal,
  selectpartnershipLoading,
} from "@/store/slices/partnershipSlice";

import { motion } from "framer-motion";
import { rowAnim, cardAnim } from "@/lib/animation";

import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import PartnershipFilters from "./PartnershipFilters";
import ArchivePagination from "@/components/ReuseableComponent/Pagination";
import Image from "next/image";
import SmallLOGO from "@/assets/smalllogo.png";
import { Modal } from "antd";

export default function PartnershipFilterGrid() {
  const dispatch = useDispatch();

  const partnership = useSelector(selectpartnershipPosts);
  const total = useSelector(selectpartnershipTotal);
  const loading = useSelector(selectpartnershipLoading);

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ keyword: "", year: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activePartnership, setActivePartnership] = useState(null);

  const pageSize = 12;

  useEffect(() => {
    dispatch(fetchPartnershipYears());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchpartnershipPosts({ page, ...filters }));
  }, [dispatch, page, filters]);

  const sortedPartnership = useMemo(() => {
    return [...partnership].sort((a, b) => {
      const aDate = new Date(a?.date_gmt || a?.date || a?.modified_gmt);
      const bDate = new Date(b?.date_gmt || b?.date || b?.modified_gmt);
      return bDate - aDate;
    });
  }, [partnership]);

  const handleFilter = ({ keyword, year }) => {
    setPage(1);
    setFilters({ keyword, year });
  };

  const openModal = (item) => {
    setActivePartnership(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setActivePartnership(null);
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div className="container py-5 gridbox" variants={rowAnim} initial="hidden" whileInView="show">
        <PartnershipFilters onFilter={handleFilter} />

        {loading && (
          <div className="text-center py-5">
            <GlobalLoader />
          </div>
        )}

        {!loading && sortedPartnership.length === 0 && (
          <div className="text-center py-5">
            <h4>No partnership found</h4>
          </div>
        )}

        {!loading && sortedPartnership.length > 0 && (
          <div className="row">
            {sortedPartnership.map((item, index) => {
              const title = item?.title?.rendered;
              const img = item?.featured_image;
              const dateStr = item?.acf?.partnership_date || "";
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
                      <Image src={SmallLOGO} width={600} height={400} alt="No Image" />
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
        {activePartnership && (
          <>
            <h3 dangerouslySetInnerHTML={{ __html: activePartnership?.title?.rendered }} />
            <div dangerouslySetInnerHTML={{ __html: activePartnership?.content?.rendered || "" }} />
          </>
        )}
      </Modal>
    </>
  );
}
