import { Formik, Field, Form } from "formik";

import CustomSelect from "../CustomSelect";

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
  InputVerticalFlex,
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
        ForRent: "0",
        Mans: [""],
        Cats: [""],
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
          <FilterIcon src={FilterCarIcon} height={14} width={30}></FilterIcon>
          <FilterIcon src={FilterTruckIcon} height={18} width={22}></FilterIcon>
          <FilterIcon src={FilterBikeIcon} height={14} width={30}></FilterIcon>
        </IconsContainer>
        <Form>
          <InputContainer>
            <InputVerticalFlex>
              <Label htmlFor="ForRent">გარიგების ტიპი</Label>
              <Field name="ForRent" id="ForRent">
                {({ field }: { field: any }) => (
                  <CustomSelect
                    placeholder="გარიგების ტიპი"
                    isMulti={false}
                    field={field}
                    data={[
                      { value: "0", label: "იყიდება" },
                      { value: "1", label: "ქირავდება" },
                    ]}
                  />
                )}
              </Field>
            </InputVerticalFlex>
            <InputVerticalFlex>
              <Label htmlFor="Mans">მწარმოებელი</Label>
              <Field name="Mans" id="Mans">
                {({ field }: { field: any }) => (
                  <CustomSelect
                    placeholder="მწარმოებელი"
                    isMulti
                    field={field}
                    data={manufacturersList.map((item: Manufacturer) => ({
                      value: item.man_id,
                      label: item.man_name,
                    }))}
                  />
                )}
              </Field>
            </InputVerticalFlex>
            <InputVerticalFlex>
              <Label htmlFor="Cats">კატეგორია</Label>
              <Field name="Cats" id="Cats">
                {({ field }: { field: any }) => (
                  <CustomSelect
                    placeholder="კატეგორია"
                    isMulti
                    field={field}
                    data={categoryList.map((item: Category) => ({
                      value: item.category_id,
                      label: item.title,
                    }))}
                  />
                )}
              </Field>
            </InputVerticalFlex>
            <PriceContainer>
              <InputVerticalFlex>
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
              </InputVerticalFlex>
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
