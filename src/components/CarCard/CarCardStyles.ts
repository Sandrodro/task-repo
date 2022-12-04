import styled from "styled-components";
export const MainContainer = styled.section.attrs({
  className: "grid grid-cols-5 bg-white rounded-xl w-full gap-x-1.5 py-4 px-3",
})``;

export const ImageContainer = styled.div.attrs({
  className: "col-span-1 bg-red",
})``;

export const InfoContainer = styled.div.attrs({
  className: "col-span-4 grid grid-rows-4 grid-cols-1",
})``;

export const TopInfoContainer = styled.div.attrs({
  className: "row-span-1 flex flex-row justify-between",
})``;

export const InnerFlex = styled.div.attrs({
  className: "flex flex-row gap-x-1.5",
})``;

export const ProductTitle = styled.h4.attrs({
  className: "text-black text-sm font-semibold",
})``;

export const YearLabel = styled.p.attrs({
  className: "text-gray-400 text-sm font-semibold",
})``;

export const MiddleInfoContainer = styled.div.attrs({
  className: "row-span-2 grid grid-cols-3",
})``;

export const MiddleInnerFlex = styled.div.attrs({
  className: "flex flex-col col-span-1 gap-5",
})``;

export const PriceContainer = styled.div.attrs({
  className: "flex flex-col col-span-1 gap-5 justify-self-end",
})``;

export const LowerInfoContainer = styled.div.attrs({
  className: "row-span-1 flex flex-row justify-between",
})``;

export const LowerInnerFlex = styled.div.attrs({
  className: "flex flex-row justify-between items-end gap-4 text-xs",
})`
  color: #6f7383;
`;

export const AttributeText = styled.div.attrs({
  className: "text-xs font-medium",
})`
  color: #1b1d25;
`;

export const AttributeContainer = styled.div.attrs({
  className: "flex flex-row items-center gap-3",
})``;
