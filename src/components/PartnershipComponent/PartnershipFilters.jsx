"use client";

import { useState } from "react";
import { Input, Select, Button } from "antd";
import { useSelector } from "react-redux";
import { selectpartnershipYears, selectpartnershipLoadingYears } from "@/store/slices/partnershipSlice";

export default function PartnershipFilters({ onFilter }) {
  const years = useSelector(selectpartnershipYears);
  const loadingYears = useSelector(selectpartnershipLoadingYears);

  const [keyword, setKeyword] = useState("");
  const [year, setYear] = useState(null);

  return (
    <div className="row filters-projects with-partnership">
      <div className="col-sm-8">
        <Input placeholder="Search partnership..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
      </div>

      <div className="col-sm-2">
        <Select
          placeholder="Filter by Year"
          allowClear
          loading={loadingYears}
          onChange={setYear}
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
