import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chart from "./routes/Chart";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Slider from "./routes/InfinityLoopCarousel/Slider";
import ScrollMain from "./routes/InfinityScroll/ScrollMain";
import PaginationPage from "./routes/Pagination/PaginationPage";
import Pagination2 from "./routes/Pagination2/Pagination2";
import Post from "./routes/Pagination3/Post";
import Price from "./routes/Price";
function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Coins />}></Route>
        {/* <Route path="/pagination" element={<PaginationPage />}></Route>
        <Route path="/pagination2" element={<Pagination2 />}></Route> */}

        <Route path="/pagination3" element={<Post />}></Route>
        {/* <Route path="/:coinId" element={<Coin />}>
          <Route path="price" element={<Price />}></Route>
          <Route path="chart" element={<Chart />}></Route>
        </Route> */}
        <Route path="/infiniteCarousel" element={<Slider />}></Route>
        <Route path="/infiniteScroll" element={<ScrollMain />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
