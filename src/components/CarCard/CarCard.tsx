import { useMemo } from "react";

import carIcon from "../../assets/carIcon.svg";
import heartIcon from "../../assets/heartIcon.svg";
import penIcon from "../../assets/penIcon.svg";
import AutomaticIcon from "../../assets/automaticIcon.svg";
import KmIcon from "../../assets/kmIcon.svg";
import VolumeIcon from "../../assets/volumeIcon.svg";
import WheelIcon from "../../assets/wheelIcon.svg";
import moment from "moment";

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
  AttributeText,
  AttributeContainer,
  PriceContainer,
} from "./CarCardStyles";

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
  loading: boolean;
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
  loading,
}: IProps) => {
  const differenceInDays = useMemo(() => {
    const orderDate = moment(order_date);
    const currentDate = moment(new Date());
    const diff = currentDate.diff(orderDate, "days");
    return diff;
  }, [order_date]);

  return (
    <MainContainer loading={loading}>
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
            <AttributeContainer>
              <img src={VolumeIcon} width={16}></img>
              <AttributeText>{engine_volume} დატ.ჰიბრიდი</AttributeText>
            </AttributeContainer>
            <AttributeContainer>
              <img src={AutomaticIcon} width={16}></img>
              <AttributeText>ავტომატიკა</AttributeText>
            </AttributeContainer>
          </MiddleInnerFlex>
          <MiddleInnerFlex>
            <AttributeContainer>
              <img src={KmIcon} width={16}></img>
              <AttributeText>{car_run_km} კმ</AttributeText>
            </AttributeContainer>
            <AttributeContainer>
              <img src={WheelIcon} width={16}></img>
              <AttributeText>
                {right_wheel ? "მარჯვენა" : "მარცხნივ"}
              </AttributeText>
            </AttributeContainer>
          </MiddleInnerFlex>
          <PriceContainer>{price} ლ</PriceContainer>
        </MiddleInfoContainer>
        <LowerInfoContainer>
          <LowerInnerFlex>
            {views} ნახვა ● {differenceInDays} დღის წინ
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
