"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  fetchpeopleDepart,
  selectpeopleDepart,
  selectpeopleDepartLoading,
  selectpeopleDepartTotal,
} from "@/store/slices/peopleDepartSlice";
import GlobalLoader from "@/components/GlobalCompo/GlobalLoader";
import ArchivePagination from "@/components/ReuseableComponent/Pagination";
import { rowAnim } from "@/lib/animation";

export default function PeopleDeparts() {
  const dispatch = useDispatch();

  const peopleDepart = useSelector(selectpeopleDepart);
  const loading = useSelector(selectpeopleDepartLoading);
  const total = useSelector(selectpeopleDepartTotal);

  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(fetchpeopleDepart({ page }));
  }, [dispatch, page]);

  if (loading && (!peopleDepart || peopleDepart.length === 0)) {
    return (
      <div className="container text-center py-5">
        <GlobalLoader />
      </div>
    );
  }

  if (!peopleDepart || peopleDepart.length === 0) {
    return <div className="container text-center py-5">No Departments Found</div>;
  }

  // ⭐ CUSTOM ORDER (SLUG BASED)
  const slugOrder = ["architecture", "planning-urban-design", "interiors", "landscape", "lighting-design"];

  // ⭐ SORT DEPARTMENTS BY ORDER
  const sortedDepartments = [...peopleDepart].sort((a, b) => {
    const aIndex = slugOrder.indexOf(a.slug);
    const bIndex = slugOrder.indexOf(b.slug);

    return (aIndex === -1 ? 999 : aIndex) - (bIndex === -1 ? 999 : bIndex);
  });

  return (
    <motion.div
      className="container bottom-pad"
      id="departments"
      variants={rowAnim}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.2 }}
    >
      <div className="row">
        <div className="col-sm-9">
          <p className="sub-heading">Our teams</p>
          <h2>
            Where Collaboration
            <br /> Becomes Creation
          </h2>
        </div>
      </div>

      <div className="row boxes">
        {sortedDepartments.map((dept) => {
          const title = dept?.name || "";
          const desc = dept?.description || "";
          const img = dept?.acf?.people_depart_texanomy;
          const slug = dept?.slug;
          const peopleCount = dept?.people?.length || 0;

          return (
            <motion.div key={dept.id} className="col-sm-6 mb-5 poeple-depart" whileHover={{ scale: 0.95 }}>
              {img && (
                <Image
                  src={img}
                  alt={title}
                  width={600}
                  height={400}
                  className="img-fluid mb-3 dept-img"
                  loading="lazy"
                />
              )}

              <h4 className="dept-title" dangerouslySetInnerHTML={{ __html: title }} />

              {/* <p className="dept-count">{peopleCount} People</p> */}

              <div className="dept-desc wysiwyg-text" dangerouslySetInnerHTML={{ __html: desc }} />

              <Link href={`/people/department/${slug}`} className="dept-card">
                View Team →
              </Link>
            </motion.div>
          );
        })}
      </div>

      {total > 10 && <ArchivePagination current={page} pageSize={10} total={total} onChange={(p) => setPage(p)} />}
    </motion.div>
  );
}
