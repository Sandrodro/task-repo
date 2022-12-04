import styled from "styled-components";

export const FilterContainer = styled.div.attrs({
  className:
    "flex flex-col items-center justify-start w-60 h-fit bg-white rounded-t-xl px-6 py-5 mb-8 border",
})`
  border-color: #e2e5eb;
  box-shadow: 0px 4px 16px rgba(164, 174, 193, 0.1);

  & form {
    display: block;
    width: 100%;
    height: fit-content;
  }
`;

export const IconsContainer = styled.div.attrs({
  className: "h-12 w-full flex flex-row items-end justify-between pb-8",
})``;

export const FilterIcon = styled.img.attrs({
  className: "block w-8",
})``;

export const InputContainer = styled.div.attrs({
  className: "w-full flex flex-col items-center justify-center gap-y-5",
})``;

export const ButtonContainer = styled.div.attrs({
  className: "h-12 w-full flex flex-row items-center justify-center",
})``;

export const PriceContainer = styled.div.attrs({
  className: "h-20 w-full flex flex-col items-start gap-y-5",
})``;

export const LabelAndIcon = styled.div.attrs({
  className: "flex flex-row justify-start items-center",
})``;
export const RangeContainer = styled.div.attrs({
  className: "flex flex-row gap-2 w-full justify-center items-center",
})``;

export const SubmitButton = styled.button.attrs({
  className: "bg-red-600 text-white w-52 h-8 rounded-md",
})``;

export const Label = styled.label.attrs({
  className: "text-xs font-medium",
})``;

export const InputVerticalFlex = styled.div.attrs({
  className: "flex flex-col gap-2 w-full",
})``;

export const StyledSelect = styled.select.attrs({
  className:
    "h-10 py-2 w-52 px-3 bg-white text-sm border-2 rounded-lg border-gray-300",
})`
  color: #6f7383;
`;

export const StyledNumberField = styled.input.attrs({
  className:
    "h-10 py-2.5 w-5/12 px-3 bg-white text-xs border-2 rounded-lg border-gray-300",
})``;
