"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";

export default function DepartmentLocations({ locations, selectedLocation, onSelectLocation }) {
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
