import axios from "axios";

const BASE_URL = "https://api.coinpaprika.com";

export async function fetchCoins() {
  return (await axios.get(`${BASE_URL}/v1/coins`)).data;
}
export async function fetchCoinInfo(coinId: string | undefined) {
  return (await axios.get(`${BASE_URL}/v1/coins/${coinId}`)).data;
}
export async function fetchCoinTickers(coinId: string | undefined) {
  return (await axios.get(`${BASE_URL}/v1/tickers/${coinId}`)).data;
}
export async function fetchCoinHistory(coinId: string | undefined) {
  return (
    await axios.get(
      `https://ohlcv-api.nomadcoders.workers.dev/?coinId=${coinId}`
    )
  ).data;
}
