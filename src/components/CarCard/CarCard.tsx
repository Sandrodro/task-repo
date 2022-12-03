import React from "react";
import styled from "styled-components";

import { Product } from "../../types";

interface IProps {
  manufacturer_name: string;
  prod_year: number;
  customs_passed: boolean;
  price: number;
  engine_volume: number;
  car_run_km: number;
  right_wheel: boolean;
  views: number;
  order_date: string;
  paid_add?: number;
  prom_color?: number;
  model_name: string;
  car_model: string;
}

const CarCard = ({
  model_name,
  car_model,
  manufacturer_name,
  prod_year,
}: IProps) => {
  return (
    <MainContainer>
      <ImageContainer />
      <InfoContainer>
        <TopInfoContainer>
          <InnerFlex>
            <ProductTitle>{`${manufacturer_name.toUpperCase()} ${model_name} ${car_model}`}</ProductTitle>
            <YearLabel>{`${prod_year} წ`}</YearLabel>
          </InnerFlex>
          <InnerFlex></InnerFlex>
        </TopInfoContainer>
      </InfoContainer>
    </MainContainer>
  );
};

export default CarCard;

const MainContainer = styled.section.attrs({
  className: "grid grid-cols-5 bg-white",
})``;

const ImageContainer = styled.div.attrs({
  className: "col-span-1 bg-red",
})``;

const InfoContainer = styled.div.attrs({
  className: "col-span-4 bg-blue grid grid-rows-4 grid-cols-1",
})``;

const TopInfoContainer = styled.div.attrs({
  className: "row-span-1 flex flex-row justify-between",
})``;

const InnerFlex = styled.div.attrs({
  className: "flex flex-row gap-x-1.5",
})``;

const ProductTitle = styled.h4.attrs({
  className: "text-black text-sm font-semibold",
})``;

const YearLabel = styled.p.attrs({
  className: "text-gray-400 text-sm font-semibold",
})``;
