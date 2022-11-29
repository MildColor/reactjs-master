import axios from "axios";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { jsonPlaceHolderPosts } from "../../types";
import styled from "styled-components";
import PostPagination from "./PostPagination";

function Post() {
  const {
    isLoading,
    data: posts,
    error,
  } = useQuery<jsonPlaceHolderPosts[]>(["jsonPlaceHolder1"], async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts");
    return res.data;
  });

  // 총 item 갯수
  const total = posts?.length || 1;

  //페이지당 게시물 수
  const [limit, setLimit] = useState(10);
  //현재 페이지 번호
  const [page, setPage] = useState(1);
  
  // page가 n이라면 n번째 게시물의 위치(index)
  const offset = (page - 1) * limit;

  // 최대 페이지 갯수
  const maxPageNum = Math.ceil(total! / limit);

  // 한번에 표시할 페이지 갯수
  const [pageRange, setPageRange] = useState(1);

  // 등분할 페이지 갯수
  const dividingPageNum = Math.ceil(maxPageNum / pageRange);

  //등분할 페이지 갯수가 1보다 작거나 같은 경우는 최대페이지 갯수를 페이지 범위로 설정한다.
  if (dividingPageNum < 1) {
    setPageRange(maxPageNum);
  }

  useEffect(() => setPageRange(maxPageNum), [maxPageNum]);

  return (
    <>
      <header>
        <StH1>POST LIST</StH1>
      </header>
      <label htmlFor="">
        보여줄 item의 갯수
        <select
          name=""
          id=""
          value={limit}
          onChange={({ target: { value } }) => {
            setLimit(parseInt(value));
          }}
        >
          <option value="3">3</option>
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </label>
      보여줄 페이지 범위 설정
      <label htmlFor="">
        <select
          name=""
          id=""
          value={pageRange}
          onChange={({ target: { value } }) => {
            setPageRange(parseInt(value));
          }}
        >
          {maxPageNum &&
            Array(maxPageNum)
              .fill(0)
              .map((_, idx) => (
                <option value={idx + 1} key={idx + 1}>
                  {idx + 1}
                </option>
              ))}
        </select>
      </label>
      <Layout>
        <main>
          {posts?.slice(offset, offset + limit).map((post) => {
            return (
              <StArticle key={post.id}>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </StArticle>
            );
          })}
        </main>
      </Layout>
      <StFooter>
        <PostPagination
          page={page}
          pageRange={pageRange}
          limit={limit}
          total={total}
          maxPageNum={maxPageNum}
          setPage={setPage}
          setPageRange={setPageRange}
        ></PostPagination>
      </StFooter>
    </>
  );
}

export default Post;

const StH1 = styled.h1`
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 50px 0;
`;

const Layout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 800px;
  margin: 0 auto;
`;

const StArticle = styled.article`
  width: 80%;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid #fff;
  h3 {
    font-size: 20px;
    margin-bottom: 7px;
  }
`;

const StFooter = styled.div`
  display: flex;
  max-width: 800px;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
`;
