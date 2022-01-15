import tw, { styled } from "twin.macro";
import { Button } from "antd";

export const Main = styled.div`
  .ant-select {
    font-size: 16px;
    padding: 8px 0px;
    min-width: 244px;
    margin: 1rem;
  }
`;

export const SearchBtn = styled(Button)`
  background-color: #5f7df2;
  width: 8rem;
  padding: 4px 0px;
  color: white;
  cursor: pointer;
  margin-left: 2rem;
  border-radius: 16px;
  font-size: 14px;
  height: auto;
  &:hover {
    background-color: #5f7df2;
    color: white;
  }
`;
