const MANUFACTURERS_LIST_API_ENDPOINT =
  process.env.REACT_APP_MANUFACTURERS_LIST;
const CATEGORY_LIST_API_ENDPOINT = process.env.REACT_APP_CATEGORY_LIST;
const CAR_MODELS_API_ENDPOINT = process.env.REACT_APP_CAR_MODEL_LIST;

const getManufacturersList = async () => {
  const data = await fetch(MANUFACTURERS_LIST_API_ENDPOINT as string);
  const parsed = await data.json();
  return parsed;
};

const getCategoryList = async () => {
  const data = await fetch(CATEGORY_LIST_API_ENDPOINT as string);
  const parsed = await data.json();
  return parsed;
};

const getProductList = async (url: string) => {
  const data = await fetch(url);
  const parsed = await data.json();
  return parsed;
};

const getCarModelsPerManufacturer = async (manufacturerId: number | string) => {
  const data = await fetch(
    `${CAR_MODELS_API_ENDPOINT}?man_id=${manufacturerId}`
  );
  const parsed = await data.json();
  return parsed;
};

export {
  getManufacturersList,
  getCategoryList,
  getProductList,
  getCarModelsPerManufacturer,
};
