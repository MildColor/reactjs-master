import React, { useState } from "react";
import styled from "styled-components";

//object shape을 ts에게 설명해주고 싶을 때
interface CircleProps {
  bgColor: string;
  //옵셔널로 borderColor를 required하지 않게 만들어준다.
  borderColor?: string;
  children?: string;
}

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

//bgColor의 타입은 CircleProps의 Object이다. 라고 말해주고 있는것
const Circle = ({ bgColor, borderColor, children }: CircleProps) => {
  //typeScript는 useState의 초기값으로 type을 적용시킨다.
  // number와 string 모두 적용시키고 싶다면, 아래와 같이 사용
  //   const [counter, setCounter] = useState<number | string>();
  const [counter, setCounter] = useState<number | string>();
  setCounter("hello");

  return (
    <Container bgColor={bgColor} borderColor={borderColor ?? bgColor}>
      {children}
    </Container>
  );
};
export default Circle;

// 타입스크립트에게 container가 props를 받을거라고 얘기
const Container = styled.div<ContainerProps>`
  height: 200px;
  width: 200px;
  background-color: ${(props) => props.bgColor};
  border: 1px solid ${(props) => props.borderColor};
`;

//interface는 object가 어떤식으로 보일지 설명해주는 것.
