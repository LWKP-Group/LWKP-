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

  //  SORT & UNIQUE LOCATION LIST
  const sortedLocations = useMemo(() => {
    const all = people.flatMap((p) => p.locations || []);
    const unique = [...new Set(all)];

    // English + Chinese names with the SAME order
    const order = [
      ["Hong Kong", "香港"],
      ["Shenzhen", "深圳"],
      ["Guangzhou", "广州"],
      ["Shanghai", "上海"],
      ["Chongqing", "重庆"],
      ["Beijing", "北京"],
      ["Shenyang", "沈阳"],
      ["Macau", "澳门"],
      ["Manila", "马尼拉"],
      ["Dubai", "迪拜"],
      ["Riyadh", "利雅得"],
    ];

    const orderMap = new Map();

    order.forEach(([en, ch], index) => {
      orderMap.set(en, index);
      orderMap.set(ch, index);
    });

    return unique.sort((a, b) => {
      const ai = orderMap.get(a) ?? 999;
      const bi = orderMap.get(b) ?? 999;

      return ai - bi;
    });
  }, [people]);

  // DEFAULT LOCATION = FIRST SORTED LOCATION
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
            locations={sortedLocations}
            selectedLocation={selectedLocation}
            onSelectLocation={(loc) => {
              setSelectedLocation(loc);
              setSelectedPerson(null);
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
