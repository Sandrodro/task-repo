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
} from "./MainStyles";

import { Colors } from "../../constants";

const Main = () => {
  const [manufacturersList, setManufacturersList] = useState<Manufacturer[]>();
  const [categoryList, setCategoryList] = useState<Category[]>();
  const [productList, setProductList] = useState<Product[]>();
  const [modelList, setModelList] = useState<Model[]>();
  const [filterAndSort, setFilterAndSort] = useState<FilterAndSort | null>({
    ForRent: "",
    Mans: "",
    Cats: "",
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
    console.log("PRODUCT LIST", productList);
    console.log("CATEGORY LIST", categoryList);
    console.log("MANUFACTURERS LIST", manufacturersList);
    console.log("MODELS LIST", modelList);
  }, [manufacturersList, categoryList, productList, modelList]);

  useEffect(() => {
    getManufacturersList().then((data: any) => setManufacturersList(data));
    getCategoryList().then((data: any) => setCategoryList(data.data));
    getProductList(process.env.REACT_APP_PRODUCT_LIST as string).then(
      (data: any) => setProductList(data.data.items)
    );
  }, []);

  useEffect(() => {
    console.log(filterAndSort);
    if (filterAndSort) {
      const requestUrl = `${process.env.REACT_APP_PRODUCT_LIST}?TypeID=0&ForRent=${filterAndSort.ForRent}&Mans=${filterAndSort.Mans}&CurrencyID=1&MileageType=1&SortOrder=${filterAndSort.SortOrder}&Page=1&Period=${filterAndSort.Period}&Cats=${filterAndSort.Cats}&PriceFrom=${filterAndSort.PriceFrom}&PriceTo=${filterAndSort.PriceTo}`;
      getProductList(requestUrl).then((data: any) =>
        setProductList(data.data.items)
      );
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
    <div>
      <Header />
      <BodyContainer>
        <MainFlex>
          <LeftGridItem>
            {!dataLoaded && (
              <PuffLoader
                size={100}
                color={Colors.RED}
                cssOverride={{ display: "block", margin: "0 auto" }}
              />
            )}
            {productList && manufacturersList && modelList && categoryList && (
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
              <Sort setFilterAndSort={setFilterAndSort} />
              {productList && manufacturersList && modelList && (
                <>
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
    </div>
  );
};

export default Main;
