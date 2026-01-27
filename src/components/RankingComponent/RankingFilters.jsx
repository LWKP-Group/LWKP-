"use client";

import { useState } from "react";
import { Input, Select, Button } from "antd";
import { useSelector } from "react-redux";
import { selectrankingYears, selectrankingLoadingYears } from "@/store/slices/rankingSlice";

export default function RankingFilters({ onFilter }) {
  const years = useSelector(selectrankingYears);
  const loadingYears = useSelector(selectrankingLoadingYears);

  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState(null);

  return (
    <div className="row filters-projects with-ranking">
      <div className="col-sm-8">
        <Input placeholder="Search ranking..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </div>

      <div className="col-sm-2">
        <Select
          placeholder="Filter by Year"
          allowClear
          loading={loadingYears}
          onChange={(val) => setYear(val)}
          options={years.map((y) => ({ value: y, label: y }))}
          style={{ width: "100%" }}
        />
      </div>

      <div className="col-sm-2">
        <Button className="button-css" onClick={() => onFilter({ keyword, year })}>
          SEARCH
        </Button>
      </div>
    </div>
  );
}
