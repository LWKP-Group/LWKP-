"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAwardsYears,
  fetchawardsPosts,
  selectAwardsPosts,
  selectAwardsTotal,
  selectAwardsLoading,
} from "@/store/slices/awardsSlice";

import { motion } from "framer-motion";
import { rowAnim, cardAnim } from "@/lib/animation";

import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import AwardsFilters from "./AwardsFilters";
import ArchivePagination from "@/components/ReuseableComponent/Pagination";
import Image from "next/image";
import SmallLOGO from "@/assets/smalllogo.png";

export default function AwardsFilterGrid() {
  const dispatch = useDispatch();

  const posts = useSelector(selectAwardsPosts);
  const total = useSelector(selectAwardsTotal);
  const loading = useSelector(selectAwardsLoading);

  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({ keyword: "", year: "" });

  // Load years once
  useEffect(() => {
    dispatch(fetchAwardsYears());
  }, [dispatch]);

  // Load paginated filtered results
  useEffect(() => {
    dispatch(fetchawardsPosts({ page, ...filters }));
  }, [dispatch, page, filters]);

  const handleFilter = ({ keyword, year }) => {
    setPage(1);
    setFilters({ keyword, year });
  };

  // 🔥 SORT BY PUBLISH DATE (latest first)
  const sortedAwards = useMemo(() => {
    return [...posts].sort((a, b) => {
      const aDate = new Date(a?.date_gmt || a?.date || a?.modified_gmt);
      const bDate = new Date(b?.date_gmt || b?.date || b?.modified_gmt);
      return bDate - aDate; // latest first
    });
  }, [posts]);

  return (
    <motion.div className="container py-5 gridbox" variants={rowAnim} initial="hidden" whileInView="show">
      {/* FILTERS */}
      <AwardsFilters onFilter={handleFilter} />

      {/* LOADER */}
      {loading && (
        <div className="text-center py-5">
          <GlobalLoader />
        </div>
      )}

      {/* NO DATA */}
      {!loading && sortedAwards.length === 0 && (
        <div className="text-center py-5">
          <h4>No awards found</h4>
        </div>
      )}

      {/* DATA GRID */}
      {!loading && sortedAwards.length > 0 && (
        <div className="row">
          {sortedAwards.map((award, index) => {
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
                    <Image src={img} width={600} height={400} className="img-fluid" alt={title} loading="lazy" />
                  ) : (
                    <Image src={SmallLOGO} width={600} height={400} alt={title} loading="lazy" />
                  )}
                </div>

                <h5 dangerouslySetInnerHTML={{ __html: title }} />
                {yearText && <h6>{yearText}</h6>}
              </motion.div>
            );
          })}
        </div>
      )}

      {/* PAGINATION */}
      {!loading && total > 12 && (
        <ArchivePagination
          current={page}
          pageSize={12}
          total={total}
          onChange={(p) => {
            setPage(p);
            window.scrollTo({ top: 200, behavior: "smooth" });
          }}
        />
      )}
    </motion.div>
  );
}
