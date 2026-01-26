"use client";

import { Pagination } from "antd";

export default function ArchivePagination({ current = 1, pageSize = 6, total = 0, onChange = () => {} }) {
  return (
    <div className="d-flex justify-content-center mt-5 mb-5">
      <Pagination current={current} pageSize={pageSize} total={total} onChange={onChange} showSizeChanger={false} />
    </div>
  );
}
