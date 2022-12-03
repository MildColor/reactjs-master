import React, { useLayoutEffect, useRef, useEffect, useState } from "react";
import styled from "styled-components";

function Slider() {
  const items = ["#33a", "#8c9", "#f3e074"];
  const itemsSize = items.length;
  const addItems = 3;
  let slides = setSlides(addItems);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMouseIn, setIsMouseIn] = useState(false);
  const [transition, setTransition] = useState("");
  const slidesLength = slides.length;
  const transitionTime = 500;
  const transitionStyle = `transform ${transitionTime}ms ease 0s`;

  const handleSwipe = (direction: number) => {
    let index = currentIndex + direction;
    setCurrentIndex(index);

    // 여기는 replaceSlide함수와 더불어서 배열의 중간에서 만 존재할 수 있도록 설정하는 조건
    if (index < addItems) {
      index += itemsSize;
      replaceSlide(index);
    } else if (index >= itemsSize + addItems) {
      index -= itemsSize;
      replaceSlide(index);
    }
    setTransition(transitionStyle);
  };

  function setSlides(addItems: number) {
    let addedFront = [];
    let addedLast = [];
    var index = 0;
    while (index < addItems) {
      addedLast.push(items[index % items.length]); // 0 1 2 인덱스 순으로 push
      addedFront.unshift(items[items.length - 1 - (index % items.length)]); // 2 1 0 인덱스 순으로 unshift
      index++;
    }

    //앞뒤로 3개씩 추가 된다. -3 -2 -1 / 0 1 2 / 3 4 5 총 9개
    return [...addedFront, ...items, ...addedLast];
  }

  function getItemIndex(index: number) {
    // slide가 추가 되었기 때문에 원래 배열의 크기로 index를 설정해줘야 함 / 3개니까 0 1 2
    index -= addItems;

    if (index < 0) {
      index += itemsSize;
    } else if (index >= itemsSize) {
      index -= itemsSize;
    }

    return index;
  }

  function replaceSlide(index: number) {
    setTimeout(() => {
      setTransition("");
      setCurrentIndex(index);
    }, transitionTime);
  }

  useEffect(() => {
    let intervalId: NodeJS.Timer;

    // if (!isMouseIn) {
    //   intervalId = setInterval(() => handleSwipe(1), 3000);
    //   console.log(currentIndex);
    // }
    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [isMouseIn]);

  return (
    <div
      className="slider-area"
      onMouseEnter={() => setIsMouseIn(true)}
      onMouseLeave={() => setIsMouseIn(false)}
    >
      <div className="slider">
        <SlideButton onClick={() => handleSwipe(-1)}>&lt;</SlideButton>
        <SlideButton onClick={() => handleSwipe(1)}>&gt;</SlideButton>
        <StList className="slider-list">
          <StTrack
            className="slider-track"
            slidesLength={slidesLength}
            currentIndex={currentIndex}
            transition={transition}
          >
            {slides.map((slide, slideIndex) => {
              const itemIndex = getItemIndex(slideIndex);
              return (
                <StItem
                  key={slideIndex}
                  className={`slider-item ${
                    currentIndex === slideIndex ? "current-slide" : ""
                  }`}
                  color={items[itemIndex]}
                  transition={transition}
                >
                  <div>{slideIndex}</div>
                </StItem>
              );
            })}
          </StTrack>
        </StList>
      </div>
    </div>
  );
}

export default Slider;

const StList = styled.div`
  /* left: 50%;
  top: 50%;
  transform: translate(-50%, -50%); */
`;

const StTrack = styled.div<{
  slidesLength: number;
  currentIndex: number;
  transition: string;
}>`
  display: flex;
  height: 300px;
  align-items: center;
  position: absolute;
  transition: ${({ transition }) => transition};
  transform: ${({ slidesLength, currentIndex }) =>
    `translateX(${(-100 / slidesLength) * (0 + currentIndex)}%)`};
  .current-slide {
    width: 100vw;
    height: 300px;
  }
`;

const StItem = styled.div<{ color: string; transition: string }>`
  width: 100vw;
  height: 300px;
  background-color: ${(props) => props.color};
  border: 10px solid black;
  /* transition: ${({ transition }) => transition}; */
`;

const SlideButton = styled.button``;
