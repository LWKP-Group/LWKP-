"use client";

import { useState } from "react";
import { Input, Select, Button } from "antd";
import { useSelector } from "react-redux";
import { selectAwardsYears, selectAwardsLoadingYears } from "@/store/slices/awardsSlice";

export default function AwardsFilters({ onFilter }) {
  const years = useSelector(selectAwardsYears);
  const loadingYears = useSelector(selectAwardsLoadingYears);

  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState(null);

  return (
    <div className="row filters-projects with-awards">
      <div className="col-sm-8">
        <Input placeholder="Search awards..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </div>

      <div className="col-sm-2">
        <Select
          placeholder="Filter by Year"
          loading={loadingYears}
          allowClear
          options={years.map((y) => ({ value: y, label: y }))}
          onChange={(val) => setYear(val)}
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
