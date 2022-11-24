import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { Key, useEffect, useState } from "react";
import PaginationLib from "react-js-pagination";

import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fetchCoins } from "./api";

// 타입은 다 소문자로, String(new string) 과 string은 다르다.
interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [page, setPage] = useState(1);

  //@tanstack/react-query에서 useQuery를 사용할때 query key의 값은 대괄호로 묶어줘야합니다
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins, {
    // 데이터 refetch 될 때, 이전 데이터를 유지하는 지를 정하는 옵션.
    keepPreviousData: true,
    refetchOnWindowFocus: true,
    // 캐시데이터의 유효기간
    staleTime: 60000,
  });

  const handlePageChange = (page: number) => {
    //백엔드 api에서 page를 지원하지 않는다면 data를 slice해볼만하다.
    setPage(page);
  };
  return (
    <Container>
      <Header>
        <Title>Coin List</Title>
      </Header>
      {isLoading ? (
        "Loading..."
      ) : (
        <CoinsList>
          {data?.slice(page * 10 - 9, page * 10).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`} state={coin.name}>
                <Img
                  src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
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

export default Coins;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
`;
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.div`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
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
// const SkeletonItem = styled.div`
//   display: flex;
//   width: 100%;
//   height: 50px;
//   background-color: #f2f2f2;
//   position: relative;
//   overflow: hidden;
//   border-radius: 4px;

//   @keyframes skeleton-gradient {
//     0% {
//       background-color: rgba(165, 165, 165, 0.1);
//     }
//     50% {
//       background-color: rgba(165, 165, 165, 0.3);
//     }
//     100% {
//       background-color: rgba(165, 165, 165, 0.1);
//     }
//   }

//   &:before {
//     content: "";
//     position: absolute;
//     top: 0;
//     left: 0;
//     width: 100%;
//     height: 100%;
//     animation: skeleton-gradient 1.5s infinite ease-in-out;
//   }
// `;
