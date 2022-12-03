import { Formik, Field, Form } from "formik";

import FilterCarIcon from "../../assets/filterCarIcon.svg";
import FilterBikeIcon from "../../assets/filterBikeIcon.svg";
import FilterTruckIcon from "../../assets/filterTruckIcon.svg";

import { Manufacturer, Model, Category, FilterAndSort } from "../../types";

import {
  FilterContainer,
  FilterIcon,
  IconsContainer,
  InputContainer,
  ButtonContainer,
  PriceContainer,
  LabelAndIcon,
  RangeContainer,
  SubmitButton,
  Label,
  StyledSelect,
  StyledNumberField,
} from "./FilterStyles";

interface IProps {
  manufacturersList: Manufacturer[];
  modelList: Model[];
  categoryList: Category[];
  setFilterAndSort: any;
}

const Filter = ({
  manufacturersList,
  modelList,
  categoryList,
  setFilterAndSort,
}: IProps) => {
  return (
    <Formik
      initialValues={{
        ForRent: "",
        Mans: "",
        Cats: "",
        PriceFrom: "",
        PriceTo: "",
      }}
      onSubmit={async (values) => {
        setFilterAndSort((value: FilterAndSort) => ({
          ...value,
          ForRent: values.ForRent,
          Mans: values.Mans,
          Cats: values.Cats,
          PriceFrom: values.PriceFrom,
          PriceTo: values.PriceTo,
        }));
      }}
    >
      <FilterContainer>
        <IconsContainer>
          <FilterIcon src={FilterCarIcon}></FilterIcon>
          <FilterIcon src={FilterTruckIcon}></FilterIcon>
          <FilterIcon src={FilterBikeIcon}></FilterIcon>
        </IconsContainer>
        <Form>
          <InputContainer>
            <Label htmlFor="ForRent">გარიგების ტიპი</Label>
            <Field name="ForRent" id="ForRent">
              {({ field }: { field: any }) => (
                <StyledSelect {...field}>
                  <option value={"0"}>იყიდება</option>
                  <option value={"1"}>ქირავდება</option>
                </StyledSelect>
              )}
            </Field>
            <Label htmlFor="Mans">მწარმოებელი</Label>
            <Field name="Mans" id="Mans">
              {({ field }: { field: any }) => (
                <StyledSelect {...field} placeholder="ყველა მწარმოებელი">
                  {manufacturersList.map((item: Manufacturer) => (
                    <option value={item.man_id} key={item.man_id}>
                      {item.man_name}
                    </option>
                  ))}
                </StyledSelect>
              )}
            </Field>
            <Label htmlFor="category">კატეგორია</Label>
            <Field name="category" id="category">
              {({ field }: { field: any }) => (
                <StyledSelect {...field} placeholder="ყველა მწარმოებელი">
                  {categoryList.map((item: Category) => (
                    <option value={item.category_id} key={item.category_id}>
                      {item.title}
                    </option>
                  ))}
                </StyledSelect>
              )}
            </Field>
            <PriceContainer>
              <LabelAndIcon>
                <Label>ფასი</Label>
              </LabelAndIcon>
              <RangeContainer>
                <Field name="PriceFrom" id="PriceFrom" type="number">
                  {({ field }: { field: any }) => (
                    <StyledNumberField
                      {...field}
                      type="string"
                    ></StyledNumberField>
                  )}
                </Field>
                -
                <Field name="PriceTo" id="PriceTo" type="number">
                  {({ field }: { field: any }) => (
                    <StyledNumberField
                      {...field}
                      type="string"
                    ></StyledNumberField>
                  )}
                </Field>
              </RangeContainer>
            </PriceContainer>
            <ButtonContainer>
              <SubmitButton type="submit">ძებნა</SubmitButton>
            </ButtonContainer>
          </InputContainer>
        </Form>
      </FilterContainer>
    </Formik>
  );
};

export default Filter;
