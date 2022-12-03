import carIcon from "../../assets/carIcon.svg";
import heartIcon from "../../assets/heartIcon.svg";
import penIcon from "../../assets/penIcon.svg";

import {
  MainContainer,
  ImageContainer,
  InfoContainer,
  TopInfoContainer,
  InnerFlex,
  ProductTitle,
  YearLabel,
  MiddleInfoContainer,
  MiddleInnerFlex,
  LowerInfoContainer,
  LowerInnerFlex,
} from "./CarStyles";

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
  photo: string;
  photo_ver: number;
  car_id: number;
}

const CarCard = ({
  model_name,
  car_model,
  manufacturer_name,
  prod_year,
  photo,
  car_id,
  photo_ver,
  engine_volume,
  car_run_km,
  right_wheel,
  price,
  views,
  order_date,
}: IProps) => {
  return (
    <MainContainer>
      <ImageContainer>
        <img
          src={`https://static.my.ge/myauto/photos/${photo}/thumbs/${car_id}_1.jpg?v=${photo_ver}`}
          width={180}
          style={{ borderRadius: "8px" }}
        ></img>
      </ImageContainer>
      <InfoContainer>
        <TopInfoContainer>
          <InnerFlex>
            <ProductTitle>{`${manufacturer_name.toUpperCase()} ${model_name} ${car_model}`}</ProductTitle>
            <YearLabel>{`${prod_year} წ`}</YearLabel>
          </InnerFlex>
          <InnerFlex></InnerFlex>
        </TopInfoContainer>
        <MiddleInfoContainer>
          <MiddleInnerFlex>
            <span>{engine_volume}</span>
            <span>Automatic</span>
          </MiddleInnerFlex>
          <MiddleInnerFlex>
            <span>{car_run_km} კმ</span>
            <span>{right_wheel ? "მარჯვენა" : "მარცხნივ"}</span>
          </MiddleInnerFlex>
          <MiddleInnerFlex>{price} ლ</MiddleInnerFlex>
        </MiddleInfoContainer>
        <LowerInfoContainer>
          <LowerInnerFlex>
            {views} {order_date}
          </LowerInnerFlex>
          <LowerInnerFlex>
            <img src={penIcon} width={14}></img>
            <img src={carIcon} width={14}></img>
            <img src={heartIcon} width={14}></img>
          </LowerInnerFlex>
        </LowerInfoContainer>
      </InfoContainer>
    </MainContainer>
  );
};

export default CarCard;
