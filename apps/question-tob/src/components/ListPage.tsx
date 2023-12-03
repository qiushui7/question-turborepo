import React, { FC, useEffect, useState } from "react";
import { Pagination } from "antd";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY,
} from "../constant";

const ListPage: FC<Props> = (props) => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  const { total } = props;
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || "") || 1;
    const pageSize =
      parseInt(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY) || "") ||
      LIST_PAGE_SIZE;
    setCurrent(page);
    setPageSize(pageSize);
  }, [searchParams]);
  const handlePageChange = (page: number, pageSize: number) => {
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString());
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString());
    nav({
      pathname,
      search: searchParams.toString(),
    });
  };
  return (
    <Pagination
      current={current}
      pageSize={pageSize}
      total={total}
      onChange={handlePageChange}
    />
  );
};

type Props = {
  total: number;
};

export default ListPage;
