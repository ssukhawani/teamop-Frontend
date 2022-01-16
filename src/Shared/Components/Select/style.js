import tw, { styled } from "twin.macro";

export const Main = styled.div`
  ${tw`bg-gray-300 flex justify-center items-center rounded-xl shadow-md flex-wrap pt-4 md:pt-0 md:py-4`};
  .ant-select {
    font-size: 16px;
    padding: 8px 0px;
    min-width: 244px;
    ${tw`mx-2`}
  }
`;

