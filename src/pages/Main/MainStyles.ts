import styled from "styled-components";

export const ListContainer = styled.div.attrs({
  className: "flex flex-col gap-y-2.5",
})``;

export const MainFlex = styled.div.attrs({
  className: "flex flex-row gap-x-5",
})``;

export const LeftGridItem = styled.div.attrs({
  className: "col-span-1",
})``;

export const RightGridItem = styled.div.attrs({
  className: "col-span-4 w-fit",
})``;

export const BodyContainer = styled.main.attrs({
  className: "mx-auto w-100 px-52 bg-background",
})``;
