import tw, { styled } from "twin.macro";

export const Slot = styled.div`
  margin-top: 1rem;

  ${"h2"} {
    ${tw`text-xl font-bold margin-bottom[1rem]`}
  }
`;

export const DateSelector = styled.div`
  display: flex;
  ${tw`flex-wrap lg:flex-nowrap`}

  margin-bottom: 0.5rem;
  ${">button"} {
    background-color: #5f7df2;
    width: 10rem;
    color: white;
    cursor: pointer;
    margin-left: 3rem;
    border-radius: 8px;
    height: auto;
    ${tw` text-sm mt-3 lg:mt-0 p-2`}
  }
  ${"input"} {
    font-size: 16px;
    width: 13.3rem;
  }
`;
