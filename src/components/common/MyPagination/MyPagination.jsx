import { getAppropriatePage } from "@/utils";
import { MyPaginationStyled } from "./styles";
import {
  HiMiniChevronDoubleLeft,
  HiMiniChevronDoubleRight,
  HiMiniChevronLeft,
  HiMiniChevronRight,
} from "react-icons/hi2";

const MyPagination = ({
  currentPage,
  onChange,
  availableNumberOfRows,
  currentlySelectedNumberOfRows,
  onChangeNumberOfRows,
  totalItems,
  color
}) => {
  const totalPages = Math.ceil(totalItems / currentlySelectedNumberOfRows);



  
  return (
    <MyPaginationStyled>
      <div>
        <button
          onClick={() => onChange(1)}
          disabled={currentPage === 1}
          className="none"
        >
          <HiMiniChevronDoubleLeft />
        </button>
        <button
          onClick={() => onChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <HiMiniChevronLeft />
        </button>

        <div className="group">
          {totalPages < 5 ? (
            Array(totalPages)
              .fill(0)
              .map((_, i) => (
                <button
                  className={currentPage === i + 1 ? color? "activeSecondry":"active" : ""}
                  key={i}
                  onClick={() => onChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))
          ) : currentPage < 3 ? (
            <>
              <button
                className={currentPage === 1 ? color? "activeSecondry":"active" : ""}
                onClick={() => onChange(1)}
              >
                1
              </button>
              <button
                className={currentPage === 2 ? color? "activeSecondry":"active" : ""}
                onClick={() => onChange(2)}
              >
                2
              </button>
              <button
                className={currentPage === 3 ? color? "activeSecondry":"active" : ""}
                onClick={() => onChange(3)}
              >
                3
              </button>
              <button
                className={currentPage === 4 ? color? "activeSecondry":"active" : ""}
                onClick={() => onChange(4)}
              >
                4
              </button>
              <button
                className={currentPage === 5 ? color? "activeSecondry":"active" : ""}
                onClick={() => onChange(5)}
              >
                5
              </button>
            </>
          ) : currentPage > totalPages - 2 ? (
            <>
              <button
                className={currentPage === totalPages - 4 ? color? "activeSecondry":"active" : ""}
                onClick={() => onChange(totalPages - 4)}
              >
                {totalPages - 4}
              </button>
              <button
                className={currentPage === totalPages - 3 ? color? "activeSecondry":"active" : ""}
                onClick={() => onChange(totalPages - 3)}
              >
                {totalPages - 3}
              </button>
              <button
                className={currentPage === totalPages - 2 ? color? "activeSecondry":"active" : ""}
                onClick={() => onChange(totalPages - 2)}
              >
                {totalPages - 2}
              </button>
              <button
                className={currentPage === totalPages - 1 ? color? "activeSecondry":"active" : ""}
                onClick={() => onChange(totalPages - 1)}
              >
                {totalPages - 1}
              </button>
              <button
                className={currentPage === totalPages - 0 ? color? "activeSecondry":"active" : ""}
                onClick={() => onChange(totalPages - 0)}
              >
                {totalPages - 0}
              </button>
            </>
          ) : (
            <>
              <button
                className={currentPage === currentPage - 2 ? color? "activeSecondry":"active" : ""}
                onClick={() => onChange(currentPage - 2)}
              >
                {currentPage - 2}
              </button>
              <button
                className={currentPage === currentPage - 1 ? color? "activeSecondry":"active" : ""}
                onClick={() => onChange(currentPage - 1)}
              >
                {currentPage - 1}
              </button>
              <button
                className={currentPage === currentPage - 0 ? color? "activeSecondry":"active" : ""}
                onClick={() => onChange(currentPage - 0)}
              >
                {currentPage - 0}
              </button>
              <button
                className={currentPage === currentPage + 1 ? color? "activeSecondry":"active" : ""}
                onClick={() => onChange(currentPage + 1)}
              >
                {currentPage + 1}
              </button>
              <button
                className={currentPage === currentPage + 2 ? color? "activeSecondry":"active" : ""}
                onClick={() => onChange(currentPage + 2)}
              >
                {currentPage + 2}
              </button>
            </>
          )}
        </div>

        <button
          onClick={() => onChange(currentPage + 1)}
          disabled={totalPages === currentPage || totalPages == 0 }
        >
          <HiMiniChevronRight />
        </button>
        <button
          onClick={() => onChange(totalPages)}
          disabled={totalPages === currentPage || totalPages == 0 }
          className="none"
        >
          <HiMiniChevronDoubleRight />
        </button>
      </div>
      {/* <select
        value={currentlySelectedNumberOfRows}
        onChange={(e) => {
          onChange(
            getAppropriatePage(
              currentPage,
              currentlySelectedNumberOfRows,
              e.target.value
            )
          );
          onChangeNumberOfRows(e.target.value);
        }}
      >
        {availableNumberOfRows.map((o, i) => (
          <option value={o} key={i}>
            {o}
          </option>
        ))}
      </select> */}
    </MyPaginationStyled>
  );
};

export default MyPagination;
