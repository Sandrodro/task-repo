import { MainContainer } from "./PaginationStyles";
import { useMemo } from "react";
import ReactPaginate from "react-paginate";

import { Colors } from "../../constants";

interface IProps {
  totalPages: number;
  currentPage: number;
  setCurrentPage: Function;
  limit: number;
}

const ButtonComponent = ({ label }: { label: string }) => (
  <div style={{ whiteSpace: "nowrap", color: Colors.RED }}>{label}</div>
);

const Pagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  limit,
}: IProps) => {
  return (
    <MainContainer>
      <ReactPaginate
        pageCount={Math.ceil(totalPages / limit)}
        onPageChange={(page: any) => {
          setCurrentPage((state: any) => ({
            ...state,
            Page: page.selected + 1,
          }));
        }}
        forcePage={currentPage - 1}
        nextLabel={<ButtonComponent label=">>" />}
        previousLabel={<ButtonComponent label="<<" />}
        activeClassName="active_tab"
        pageRangeDisplayed={5}
        marginPagesDisplayed={0}
      />
    </MainContainer>
  );
};

export default Pagination;
