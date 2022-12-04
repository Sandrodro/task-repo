export type Product = {
  car_id: number;
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
  man_id: number;
  model_id: number;
  car_model: string;
  photo: string;
  photo_ver: number;
};

export type Manufacturer = {
  is_car: string;
  is_moto: string;
  is_spec: string;
  man_id: string;
  man_name: string;
};

export type Category = {
  category_id: number;
  category_type: number;
  has_icon: number;
  seo_title: string;
  title: string;
  vehicle_types: number[];
};

export type Model = {
  is_car: boolean;
  is_moto: boolean;
  is_spec: boolean;
  man_id: number;
  model_id: number;
  model_name: string;
};

export type FilterAndSort = {
  ForRent: string;
  Mans: any;
  Cats: any;
  PriceFrom: string;
  PriceTo: string;
  SortOrder: string;
  Period: string;
  Page: number;
};

export type ProductsMeta = {
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
};
