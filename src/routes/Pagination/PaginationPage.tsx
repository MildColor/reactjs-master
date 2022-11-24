import axios from "axios";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import Pagination from "./Pagination";
import styled from "styled-components";

type jsonPlaceHolderData = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

function PaginationPage() {
  const pageChangeFn = () => {};
  // boundaryCount는 1부터 입력한 숫자까지 보여준후 나머지는...으로 생략하는 것
  const { isLoading, data, error } = useQuery<jsonPlaceHolderData[]>(
    ["jsonPlaceHolder"],
    async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/todos");
      return res.data;
    }
  );
  return (
    <StContainer>
      {/* {data?.map((todo) => (
        <StDiv key={todo.id}>{todo.title}</StDiv>
      ))}
      <Pagination count={5} page={10} onPageChange={pageChangeFn} /> */}
    </StContainer>
  );
}

export default PaginationPage;

const StContainer = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
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
