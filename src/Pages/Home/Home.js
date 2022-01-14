import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "Slices/home/counterSlice";
import tw, { styled } from "twin.macro";

export const StyledApp = styled.div`
  ${tw`flex justify-center items-center flex-col h-screen bg-gray-200`}
`;

export const Button = styled.button`
  ${tw`bg-white text-purple-500 px-10 py-4 rounded-full shadow-md hover:shadow-lg  m-3 transition duration-150 font-bold`};
  &:active {
    transform: scale(0.8);
    transition-duration: 250ms;
    transition-property: background-color, border-color, color, fill, stroke,
      opacity, box-shadow, transform, filter, backdrop-filter;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  }
`;

export const Span = styled.span`
  ${tw`text-2xl`}
`;

function Home() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();
  
  return (
    <StyledApp>
      <div>
        <Span>{count}</Span>
      </div>
      <div>
        <Button
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          Increment
        </Button>
        <Button
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          Decrement
        </Button>
      </div>
    </StyledApp>
  );
}

export default Home;
