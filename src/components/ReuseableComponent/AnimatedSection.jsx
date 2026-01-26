"use client";

export default function AnimatedSection({ children }) {
  return (
    <section
      className="sticky-section"
      style={{
        position: "sticky",
        top: "0",
        background: "#fff",
        zIndex: 1
      }}>
      {children}
    </section>
  );
}
