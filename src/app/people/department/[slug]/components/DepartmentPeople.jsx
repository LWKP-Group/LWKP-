"use client";

import { Fragment } from "react";
import { motion, AnimatePresence } from "framer-motion";

const listAnim = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35 } },
};

export default function DepartmentPeople({ people, selectedLocation, selectedPersonId, onSelectPerson }) {
  if (!people || people.length === 0) {
    return <div className="col-sm-6 department-people text-center py-4">Loading people…</div>;
  }

  const filtered = selectedLocation ? people.filter((p) => p.locations?.includes(selectedLocation)) : people;

  if (!filtered || filtered.length === 0) {
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
            {filtered.map((person) => (
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
