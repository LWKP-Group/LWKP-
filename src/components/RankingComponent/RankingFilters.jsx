"use client";

import { useState, useMemo } from "react";
import { Input, Select, Button } from "antd";

export default function RankingFilters({ ranking = [], onFilter }) {
  const [keyword, setKeyword] = useState("");
  const [selectedYear, setSelectedYear] = useState(null);

  const uniqueYears = useMemo(() => {
    if (!ranking || !ranking.length) return [];

    const years = ranking
      .map(a => {
        const dateStr = a?.acf?.ranking_date;
        if (!dateStr) return null;

        const parts = dateStr.trim().split(" ");
        return parts[parts.length - 1];
      })
      .filter(Boolean);

    return [...new Set(years)].sort((a, b) => b - a);
  }, [ranking]);

  const handleSearch = () => {
    onFilter({
      keyword,
      year: selectedYear
    });
  };

  return (
    <div className="row filters-projects with-ranking">
      <div className="col-sm-8">
        <Input placeholder="Search ranking..." value={keyword} onChange={e => setKeyword(e.target.value)} />
      </div>

      <div className="col-sm-2">
        <Select placeholder="Filter by Year" allowClear onChange={val => setSelectedYear(val)} options={uniqueYears.map(y => ({ value: y, label: y }))} style={{ width: "100%" }} />
      </div>

      <div className="col-sm-2">
        <Button className="button-css" onClick={handleSearch}>
          SEARCH
        </Button>
      </div>
    </div>
  );
}
