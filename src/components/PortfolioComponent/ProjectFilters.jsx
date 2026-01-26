"use client";

import { useEffect } from "react";
import { Input, Select, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";

import { fetchProjectTypes, selectProjectTypes } from "@/store/slices/projectTypeSlice";
import { fetchProjectLocations, selectProjectLocations } from "@/store/slices/projectLocationSlice";
import { decodeHTML } from "@/lib/formatText";

export default function ProjectFilters({
  keyword,
  type,
  location,
  onKeywordChange,
  onTypeChange,
  onLocationChange,
  onSearch,
}) {
  const dispatch = useDispatch();
  const types = useSelector(selectProjectTypes) || [];
  const locations = useSelector(selectProjectLocations) || [];

  useEffect(() => {
    dispatch(fetchProjectTypes());
    dispatch(fetchProjectLocations());
  }, [dispatch]);

  return (
    <div className="row filters-projects">
      <div className="col-sm-6">
        <Input placeholder="Search here" value={keyword} onChange={(e) => onKeywordChange(e.target.value)} />
      </div>

      <div className="col-sm-2">
        <Select
          placeholder="By Type"
          allowClear
          value={type}
          onChange={onTypeChange}
          options={types.map((t) => ({
            value: t.id,
            label: decodeHTML(t.name),
          }))}
        />
      </div>

      <div className="col-sm-2">
        <Select
          placeholder="By Location"
          allowClear
          value={location}
          onChange={onLocationChange}
          options={locations.map((l) => ({
            value: l.id,
            label: decodeHTML(l.name),
          }))}
        />
      </div>

      <div className="col-sm-2">
        <Button className="button-css" onClick={onSearch}>
          SEARCH
        </Button>
      </div>
    </div>
  );
}
