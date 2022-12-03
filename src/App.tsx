import React, { useEffect, useState, useMemo } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import {
  getManufacturersList,
  getCategoryList,
  getProductList,
  getCarModelsPerManufacturer,
} from "./services";

import { Product, Manufacturer, Model } from "./types";

import Header from "./components/Header";
import CarCard from "./components/CarCard";

import { BodyContainer } from "./AppStyles";
import { Colors } from "./constants";

function App() {
  const [manufacturersList, setManufacturersList] = useState<Manufacturer[]>();
  const [categoryList, setCategoryList] = useState();
  const [productList, setProductList] = useState<Product[]>();
  const [modelList, setModelList] = useState<Model[]>();

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
    getProductList().then((data: any) => setProductList(data.data.items));
  }, []);

  useEffect(() => {
    if (manufacturersList && productList) {
      const uniqueManufacturers: any = [];
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
        const spreaded: any = [];
        data.forEach((item) => spreaded.push(...item.data));
        setModelList(spreaded);
      });
    }
  }, [manufacturersList, productList]);

  return (
    <div>
      <Header />
      <BodyContainer>
        {!dataLoaded && (
          <PuffLoader
            size={100}
            color={Colors.RED}
            cssOverride={{ display: "block", margin: "0 auto" }}
          />
        )}
        {dataLoaded && productList && manufacturersList && modelList && (
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
                />
              );
            })}
          </>
        )}
      </BodyContainer>
    </div>
  );
}

export default App;
