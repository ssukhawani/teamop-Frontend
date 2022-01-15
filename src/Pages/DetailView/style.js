import tw, { styled } from "twin.macro";

export const Slot = styled.div`
  margin-top: 2rem;
  ${"h2"} {
    ${tw`text-xl font-bold margin-bottom[1rem]`}
  }
`;

export const DateSelector = styled.div`
  display: flex;
  /* width: 455px; */
  margin-bottom: 0.5rem;
  ${">button"} {
    background-color: #5f7df2;
    width: 10rem;
    padding: 10px 16px;
    color: white;
    cursor: pointer;
    margin-left: 3rem;
    border-radius: 8px;
    font-size: 16px;
    height: auto;
  }
  ${"input"} {
    font-size: 16px;
    width: 13.3rem;
  }
`;
