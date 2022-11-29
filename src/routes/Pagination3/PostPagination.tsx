import React, { Dispatch, SetStateAction } from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";

type PostPropsTypes = {
  page: number;
  pageRange: number;
  limit: number;
  total: number | undefined;
  maxPageNum: number;
  setPage: Dispatch<SetStateAction<number>>;
  setPageRange: Dispatch<SetStateAction<number>>;
};

function PostPagination({
  page,
  pageRange,
  limit,
  total,
  maxPageNum,
  setPage,
  setPageRange,
}: PostPropsTypes) {
  const [index, setIndex] = useState(0);
  const [pageArr, setPageArr] = useState<number[]>([]);

  useEffect(() => {
    const sliceArr = Array(maxPageNum)
      .fill(0)
      .map((_, idx) => idx + 1)
      .slice(index * pageRange, index * pageRange + pageRange);

    setPageArr(sliceArr);
  }, [index, maxPageNum, pageRange]);

  console.log("page", page);
  console.log("slice", index * pageRange, index * pageRange + pageRange);
  console.log("pageArr", pageArr);

  return (
    <>
      <StNav>
        <button
          onClick={() => {
            setPage(page - 1);
            if (page <= index * pageRange + 1) {
              setIndex((prev) => prev - 1);
            }
          }}
          disabled={page === 1}
        >
          &lt;
        </button>
        {maxPageNum &&
          pageArr.map((num) => (
            <button
              key={num + 1}
              className={num === page ? "on" : ""}
              onClick={() => {
                console.log("num", num);
                setPage(num);
              }}
            >
              {num}
            </button>
          ))}

        <button
          onClick={() => {
            setPage(page + 1);
            if (page > index * pageRange + pageRange - 1) {
              setIndex((prev) => prev + 1);
              console.log(index);
            }
          }}
          disabled={page === maxPageNum}
        >
          &gt;
        </button>
      </StNav>
    </>
  );
}

export default PostPagination;

const StNav = styled.nav`
  button {
    margin: 0 5px;
    background-color: ${(props) => props.theme.bgColor};
    color: ${(props) => props.theme.textColor};
  }

  .on {
    color: palevioletred;
  }
`;
