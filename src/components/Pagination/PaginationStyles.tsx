import styled from "styled-components";

export const MainContainer = styled.div.attrs({
  className:
    "flex flex-row items-center justify-evenly w-full mx-auto mb-8 mt-8 bg-white rounded-md",
})`
  color: #5e697d;

  & ul {
    display: flex;
    & li {
      list-style: none;
      width: 15px;
      margin: 2px 36px 2px 6px;
      display: flex;
      justify-content: center;
      align-items: center;
      font-weight: 500;
      cursor: pointer;
    }
  }
  .active_tab {
    border-bottom: 3px solid #fd4100;
    color: #fd4100;
  }
  .previous {
    margin-right: 25px;
    opacity: 0.7;
  }
  .next {
    margin-left: 25px;
  }
`;
