import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { Key, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import Loader from "./Loader";

// 타입은 다 소문자로, String(new string) 과 string은 다르다.
interface IPassengerData {
  totalPassengers: number;
  totalPages: number;
  data: [
    {
      _id: string;
      name: string;
      trips: number;
      airline: [
        {
          id: number;
          name: string;
          country: string;
          logo: string;
          slogan: string;
          head_quaters: string;
          website: string;
          established: string;
        }
      ];
      __v: number;
    }
  ];
}

function ScrollMain() {
  const [itemLists, setItemLists] = useState([]);
  const targetRef = useRef<HTMLDivElement>(null);

  //   const { isLoading, data: passengerData } = useQuery<IPassengerData>(
  //     ["getPassenger"],
  //     async () => {
  //       const { data } = await axios.get(
  //         "https://api.instantwebtools.net/v1/passenger?page=0&size=10"
  //       );
  //       return data;
  //     },
  //     {}
  //   );

  const {
    isLoading,
    isFetching,
    data: passengerData,
    fetchNextPage,
  } = useInfiniteQuery(
    ["getPassenger"],
    ({ pageParam = 1 }) =>
      axios.get("https://api.instantwebtools.net/v1/passenger", {
        params: {
          page: pageParam,
          size: 20,
        },
      }),
    {
      getNextPageParam: (lastPage, allPages) => {
        // console.log(lastPage);
        // console.log(allPages);
      },
    }
  );

  console.log(passengerData?.pages);
  //   console.log(passengerData?.pages[0]?.data?.data);

  useEffect(() => {
    const onIntersect: IntersectionObserverCallback = (entries, observer) => {
      entries.forEach((entry) => {
        // 대상이 관찰범위 내에 들어와있고, Loading중이 아니라면 관찰 종료 시킨다.
        if (entry.isIntersecting && !isLoading) {
          // console.log(entry.isIntersecting);
          //관찰 종료
          observer.unobserve(entry.target);
          // 다음페이지 데이터를 가져온다.
          fetchNextPage();
          // 다시 관찰 시작
          observer.observe(entry.target);
        }
      });
    };

    let observer: IntersectionObserver;
    if (targetRef.current) {
      observer = new IntersectionObserver(onIntersect, {
        threshold: 0.4,
      });
      //관찰 시작
      observer.observe(targetRef.current as Element);
    }
    return () => observer && observer.disconnect();
  }, [fetchNextPage, isLoading, targetRef]);

  return (
    <Container>
      <Header>
        <Title>Passenger List</Title>
      </Header>
      {isLoading ? (
        "Loading..."
      ) : (
        <CoinsList>
          {passengerData?.pages.map((page: any) => {
            return page.data?.data.map((item: any) => {
              return (
                <Coin key={item._id}>
                  <Link to={""}>
                    <Img src={item.airline[0].logo} />
                    {item.name} &rarr;
                  </Link>
                </Coin>
              );
            });
          })}
          {/* {passengerData?.pages[0]?.data?.data.map((item: any) => {
            return (
              <Coin key={item._id}>
                <Link to={""}>
                  <Img src={item.airline[0].logo} />
                  {item.name} &rarr;
                </Link>
              </Coin>
            );
          })} */}
          <div ref={targetRef} className="Target-Element">
            {isLoading && <Loader />}
          </div>
        </CoinsList>
      )}
    </Container>
  );
}

export default ScrollMain;

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
  height: 35px;
  margin-right: 10px;
`;
