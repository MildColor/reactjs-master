import axios from "axios";
import React, { useState } from "react";
import PaginationLib from "react-js-pagination";
import { useQuery } from "@tanstack/react-query";
import styled from "styled-components";

type jsonPlaceHolderData = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function Pagination2() {
  const [page, setPage] = useState(1);

  //   const { isLoading, data, error } = useQuery<jsonPlaceHolderData[]>(
  //     ["jsonPlaceHolder", page],
  //     async () => {
  //       const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
  //       return res.data;
  //     }
  //   );

  const handlePageChange = (page: number) => {
    setPage(page);
  };
  return (
    <Container>
      {/* {data?.map((todo) => (
        <StDiv key={todo.id}>{todo.title}</StDiv>
      ))} */}
      <StPagenation>
        <PaginationLib
          activePage={page}
          itemsCountPerPage={10}
          totalItemsCount={450}
          pageRangeDisplayed={5}
          prevPageText={"‹"}
          nextPageText={"›"}
          onChange={handlePageChange}
        />
      </StPagenation>
    </Container>
  );
}

export default Pagination2;
const Container = styled.div`
  max-width: 480px;
  margin: 0 auto;
`;
const StPagenation = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  color: white;
  margin: 0 auto;

  ul {
    list-style: none;
    width: 100%;
  }
  li {
    float: left;
    margin: 0 10px;
    padding: 10px;
  }
  a {
    color: white;
  }
`;
const StDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50px;
  margin: 5px auto;
  border: 1px solid white;
`;
