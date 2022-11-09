import axios from "axios";
import React, { Key, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";

// 타입은 다 소문자로, String(new string) 과 string은 다르다.
interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await axios("https://api.coinpaprika.com/v1/coins");
      setCoins(data.slice(0, 100));
    })();
    setIsLoading(false);
  }, []);
  return (
    <Container>
      <Header>
        <Title>Coin List</Title>
      </Header>
      {isLoading ? (
        "Loading..."
      ) : (
        <CoinsList>
          {coins?.map((coin) => (
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

const Loader = styled.span`
  display: flex;
  align-items: center;
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
