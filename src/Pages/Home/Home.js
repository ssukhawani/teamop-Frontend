import DashboardLayout from "Shared/Dashboard/Dashboard";
import React from "react";
import tw, { styled } from "twin.macro";

export const StyledApp = styled.div`
  ${tw`flex justify-center items-center flex-col  bg-gray-200 h-full`}
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


function Home() {

  return (
    <DashboardLayout>
      Home
    </DashboardLayout>
  );
}

export default Home;
