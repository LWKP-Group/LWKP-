"use client";

import { Fragment, useMemo } from "react";
import { motion } from "framer-motion";

export default function DepartmentLocations({ people, selectedLocation, onSelectLocation }) {
  const locations = useMemo(() => {
    const all = people.flatMap((p) => p.locations || []);
    const unique = [...new Set(all)];

    const order = [
      "Hong Kong",
      "Shenzhen",
      "Guangzhou",
      "Shanghai",
      "Chongqing",
      "Beijing",
      "Shenyang",
      "Macau",
      "Manila",
      "Dubai",
      "Riyadh",
    ];

    return unique.sort((a, b) => {
      const ai = order.indexOf(a);
      const bi = order.indexOf(b);
      return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
    });
  }, [people]);

  return (
    <Fragment>
      <div className="col-sm-3 department-locations">
        <ul>
          {locations.map((loc) => (
            <motion.li
              key={loc}
              className={selectedLocation === loc ? "active" : ""}
              onClick={() => onSelectLocation(loc)}
            >
              {loc}
            </motion.li>
          ))}
        </ul>
      </div>
    </Fragment>
  );
}
