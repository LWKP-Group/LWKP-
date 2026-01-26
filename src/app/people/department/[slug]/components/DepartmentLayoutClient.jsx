"use client";

import { useState, useMemo, Fragment } from "react";
import { motion } from "framer-motion";
import { rowAnim } from "@/lib/animation";

import DepartmentLocations from "./DepartmentLocations";
import DepartmentPeople from "./DepartmentPeople";
import PreviewImage from "./PreviewImage";

export default function DepartmentLayoutClient({ people }) {
  if (!people || people.length === 0) {
    return <div className="container text-center py-5">Loading content…</div>;
  }

  // ⭐ SORT & UNIQUE LOCATION LIST
  const sortedLocations = useMemo(() => {
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

  // ⭐ DEFAULT LOCATION = FIRST SORTED LOCATION
  const [selectedLocation, setSelectedLocation] = useState(sortedLocations[0] || null);

  // ❗ NO DEFAULT PERSON
  const [selectedPerson, setSelectedPerson] = useState(null);

  return (
    <Fragment>
      <motion.div
        className="container top-bottom-pad department-single"
        variants={rowAnim}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.2 }}
      >
        <div className="row">
          <DepartmentLocations
            people={people}
            selectedLocation={selectedLocation}
            onSelectLocation={(loc) => {
              setSelectedLocation(loc);
              setSelectedPerson(null); // Reset person on location change
            }}
          />

          <DepartmentPeople
            people={people}
            selectedLocation={selectedLocation}
            selectedPersonId={selectedPerson?.id}
            onSelectPerson={(p) => setSelectedPerson(p)}
          />

          <PreviewImage selectedPerson={selectedPerson} />
        </div>
      </motion.div>
    </Fragment>
  );
}
