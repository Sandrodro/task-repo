import { useEffect, useState, useMemo } from "react";

import PuffLoader from "react-spinners/PuffLoader";
import {
  getManufacturersList,
  getCategoryList,
  getProductList,
  getCarModelsPerManufacturer,
} from "../../services";

import {
  Product,
  Manufacturer,
  Model,
  Category,
  FilterAndSort,
  ProductsMeta,
} from "../../types";

import Header from "../../components/Header";
import CarCard from "../../components/CarCard";
import Filter from "../../components/Filter";
import Sort from "../../components/Sort";
import {
  ListContainer,
  MainFlex,
  LeftGridItem,
  RightGridItem,
  BodyContainer,
  StyledSummary,
  SortFlex,
} from "./MainStyles";

import { Colors } from "../../constants";

const Main = () => {
  const [manufacturersList, setManufacturersList] = useState<Manufacturer[]>();
  const [categoryList, setCategoryList] = useState<Category[]>();
  const [productList, setProductList] = useState<Product[]>();
  const [productsMeta, setProductsMeta] = useState<ProductsMeta>();
  const [modelList, setModelList] = useState<Model[]>();
  const [filterAndSort, setFilterAndSort] = useState<FilterAndSort | null>({
    ForRent: "",
    Mans: [""],
    Cats: [""],
    PriceFrom: "",
    PriceTo: "",
    SortOrder: "",
    Period: "",
  });

  const dataLoaded = useMemo(() => {
    const allLoaded = [
      manufacturersList,
      categoryList,
      productList,
      modelList,
    ].every((item: Product[] | any) => item?.length > 0);
    return allLoaded;
  }, [manufacturersList, categoryList, productList, modelList]);

  useEffect(() => {
    getManufacturersList().then((data: any) => setManufacturersList(data));
    getCategoryList().then((data: any) => setCategoryList(data.data));
    getProductList(process.env.REACT_APP_PRODUCT_LIST as string).then(
      (data: any) => {
        setProductsMeta(data.data.meta);
        setProductList(data.data.items);
      }
    );
  }, []);

  useEffect(() => {
    console.log(filterAndSort);
    if (filterAndSort) {
      const requestUrl = `${
        process.env.REACT_APP_PRODUCT_LIST
      }?TypeID=0&ForRent=${
        filterAndSort.ForRent
      }&Mans=${filterAndSort.Mans.join(
        "-"
      )}&CurrencyID=1&MileageType=1&SortOrder=${
        filterAndSort.SortOrder
      }&Page=1&Period=${filterAndSort.Period}&Cats=${filterAndSort.Cats.join(
        "."
      )}&PriceFrom=${filterAndSort.PriceFrom}&PriceTo=${filterAndSort.PriceTo}`;
      getProductList(requestUrl).then((data: any) => {
        setProductList(data.data.items);
        setProductsMeta(data.data.meta);
      });
    }
  }, [filterAndSort]);

  useEffect(() => {
    if (manufacturersList && productList) {
      const uniqueManufacturers: number[] = [];
      productList.forEach((product) => {
        if (uniqueManufacturers.includes(product.man_id)) {
          return;
        } else {
          uniqueManufacturers.push(product.man_id);
        }
      });
      const promiseArray: any = [];
      uniqueManufacturers.forEach((manId: number) => {
        const promise = new Promise((resolve, reject) => {
          getCarModelsPerManufacturer(manId).then((data) => resolve(data));
        });
        promiseArray.push(promise);
      });
      Promise.all(promiseArray).then((data) => {
        const spreaded: Model[] = [];
        data.forEach((item) => spreaded.push(...item.data));
        setModelList(spreaded);
      });
    }
  }, [manufacturersList, productList]);

  return (
    <>
      <Header />
      <BodyContainer>
        {!dataLoaded && (
          <PuffLoader
            size={100}
            color={Colors.RED}
            cssOverride={{
              display: "flex",
              margin: "0 auto",
              alignItems: "center",
            }}
          />
        )}
        <MainFlex>
          <LeftGridItem>
            {productList &&
              manufacturersList &&
              modelList &&
              categoryList &&
              dataLoaded && (
                <Filter
                  manufacturersList={manufacturersList}
                  modelList={modelList}
                  categoryList={categoryList}
                  setFilterAndSort={setFilterAndSort}
                />
              )}
          </LeftGridItem>
          <RightGridItem>
            <ListContainer>
              {productList && manufacturersList && modelList && (
                <>
                  <SortFlex>
                    <StyledSummary>
                      {productsMeta?.total} განცხადება
                    </StyledSummary>
                    <Sort setFilterAndSort={setFilterAndSort} />
                  </SortFlex>
                  {productList.map((product: Product) => {
                    const manufacturer = manufacturersList.find(
                      (item: Manufacturer) =>
                        item.man_id === product.man_id.toString()
                    );
                    const model = modelList.find(
                      (item: Model) => item.model_id === product.model_id
                    );
                    return (
                      <CarCard
                        key={product.car_id}
                        manufacturer_name={manufacturer?.man_name || "Unknown"}
                        prod_year={product.prod_year}
                        customs_passed={product.customs_passed}
                        price={product.price}
                        engine_volume={product.engine_volume}
                        car_run_km={product.car_run_km}
                        right_wheel={product.right_wheel}
                        views={product.views}
                        order_date={product.order_date}
                        prom_color={product.prom_color}
                        model_name={model?.model_name || "Unknown"}
                        car_model={product.car_model}
                        photo={product.photo}
                        photo_ver={product.photo_ver}
                        car_id={product.car_id}
                      />
                    );
                  })}
                </>
              )}
            </ListContainer>
          </RightGridItem>
        </MainFlex>
      </BodyContainer>
    </>
  );
};

export default Main;
