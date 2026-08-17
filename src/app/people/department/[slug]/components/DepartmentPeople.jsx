"use client";

import { Fragment, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

const listAnim = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35 },
  },
};

export default function DepartmentPeople({ people, selectedLocation, selectedPersonId, onSelectPerson }) {
  if (!people || people.length === 0) {
    return <div className="col-sm-6 department-people text-center py-4">Loading people…</div>;
  }

  // DESIGNATION ORDER
  // English + Chinese use the same position
  const DESIGNATION_ORDER = [
    {
      rank: 0,
      values: ["managing director", "董事总经理"],
    },
    {
      rank: 1,
      values: ["Founder", "创办人"],
    },
    {
      rank: 2,
      values: ["group chief financial officer", "集团首席财务官", "首席财务长"],
    },
    {
      rank: 3,
      values: ["managing director - location", "区域董事总经理"],
    },
    {
      rank: 4,
      values: ["managing director - studio", "工作室董事总经理"],
    },
    {
      rank: 5,
      values: ["global design principal", "全球设计总监"],
    },
    {
      rank: 6,
      values: ["studio director", "工作室总监"],
    },
    {
      rank: 7,
      values: ["director of operations - studio", "工作室运营总监"],
    },
    {
      rank: 8,
      values: ["director of operations - location", "区域运营总监"],
    },
    {
      rank: 9,
      values: ["director", "总监", "董事"],
    },
    {
      rank: 10,
      values: ["design director", "设计总监"],
    },
    {
      rank: 11,
      values: ["project director", "项目总监", "项目董事"],
    },
    {
      rank: 12,
      values: ["director of business development", "业务发展总监"],
    },
    {
      rank: 13,
      values: ["head of digital design", "数字设计主管"],
    },
    {
      rank: 14,
      values: ["associate director", "副总监", "助理董事"],
    },
    {
      rank: 15,
      values: ["assistant general manager", "助理总经理"],
    },
    {
      rank: 16,
      values: ["senior associate", "高级顾问"],
    },
    {
      rank: 17,
      values: ["chief architect", "首席建筑师"],
    },
    {
      rank: 18,
      values: ["senior project coordinator", "高级项目协调员"],
    },
    {
      rank: 19,
      values: ["liason & facility manager", "联络与设施经理"],
    },
  ];

  // NORMALIZE helper
  const normalize = (str = "") => str.toLowerCase().replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();

  // Get designation position
  // Works with both English and Chinese
  const getDesignationRank = (designation = "") => {
    const value = normalize(designation);

    let bestRank = 999;
    let bestLength = 0;

    DESIGNATION_ORDER.forEach(({ rank, values }) => {
      values.forEach((name) => {
        const normalizedName = normalize(name);

        if (value === normalizedName || value.startsWith(normalizedName)) {
          if (normalizedName.length > bestLength) {
            bestRank = rank;
            bestLength = normalizedName.length;
          }
        }
      });
    });

    return bestRank;
  };
  // FILTER + SORT PEOPLE
  const filteredAndSorted = useMemo(() => {
    const filtered = selectedLocation ? people.filter((p) => p.locations?.includes(selectedLocation)) : people;

    return [...filtered].sort((a, b) => {
      const ai = getDesignationRank(a?.designation);
      const bi = getDesignationRank(b?.designation);

      return ai - bi;
    });
  }, [people, selectedLocation]);

  if (!filteredAndSorted.length) {
    return <div className="col-sm-6 department-people text-center py-4">No people found.</div>;
  }

  return (
    <Fragment>
      <div className="col-sm-6 department-people">
        <motion.h3
          key={selectedLocation}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="location-heading"
        >
          {selectedLocation ? selectedLocation : "All Locations"}
        </motion.h3>

        <AnimatePresence mode="wait">
          <motion.div key={selectedLocation} variants={listAnim} initial="hidden" animate="show" exit="hidden">
            {filteredAndSorted.map((person) => (
              <motion.div
                key={person.id}
                className={`row person-row ${selectedPersonId === person.id ? "active" : ""}`}
                onClick={() => onSelectPerson(person)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                <div className="col-sm-8">
                  <h5>
                    <span className="plus">+</span> {person.title || "Name not available"}
                  </h5>
                </div>

                <div className="col-sm-4">
                  <p className="designation">{person.designation || "Designation not available"}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </Fragment>
  );
}
