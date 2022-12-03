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
};

export type Manufacturer = {
  is_car: string;
  is_moto: string;
  is_spec: string;
  man_id: string;
  man_name: string;
};

export type Model = {
  cat_man_id: number;
  cat_model_id: number;
  cat_modif_id: number;
  is_car: boolean;
  is_moto: boolean;
  is_spec: boolean;
  man_id: number;
  model_group: "string";
  model_id: number;
  model_name: "string";
  show_in_salons: number;
  shown_in_slider: number;
  sort_order: number;
};
