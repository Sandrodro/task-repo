import { Formik, Field, Form } from "formik";
import { useState, useEffect } from "react";

import CustomSelect from "../CustomSelect";

import { getCarModelsPerManufacturer } from "../../services";

import FilterCarIcon from "../../assets/filterCarIcon.svg";
import FilterBikeIcon from "../../assets/filterBikeIcon.svg";
import FilterTruckIcon from "../../assets/filterTruckIcon.svg";

import { Manufacturer, Category, FilterAndSort, Model } from "../../types";

import INFO_JSON from "../../assets/json/mainInfo.json";

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
  categoryList,
  setFilterAndSort,
}: IProps) => {
  const [selectedManufacturerModels, setSelectedManufacturerModels] = useState<
    Model[]
  >([]);
  const [manufacturerIds, setManufacturerIds] = useState<any>([]);

  const [modelIds, setModelIds] = useState<string[]>([]);

  useEffect(() => {
    if (
      !manufacturerIds.every((item: any) => item === "") ||
      manufacturerIds.length !== 0
    ) {
      const promiseArray: any = [];
      manufacturerIds.forEach((manId: number) => {
        const promise = new Promise((resolve, reject) => {
          getCarModelsPerManufacturer(manId).then((data) => {
            console.log(data);
            const arr = data.data.map(
              (item: any) => `${manId}.${item.model_id}`
            );
            resolve(data);
          });
        });
        promiseArray.push(promise);
        Promise.all(promiseArray).then((data) => {
          const spreaded: Model[] = [];
          data.forEach((item) => spreaded.push(...item.data));
          setSelectedManufacturerModels(spreaded);
        });
      });
    }
  }, [manufacturerIds]);

  const handleSetModel = (option: any) => {
    setModelIds(option.map((item: any) => `${item.man_id}.${item.value}`));
  };

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
        let modelIdArray: string[] = [];
        if (modelIds.length) {
          const split = modelIds.map((item) => item.split("."));
          const uniqueMans: any = [];
          split.forEach((item: any) => {
            if (!uniqueMans.includes(item[0])) {
              uniqueMans.push(item[0]);
            }
          });
          const duplicated = uniqueMans.map((item: any) => [item, item]);
          modelIdArray = duplicated.map((item: any) => {
            const manId = item[0];
            let string = item[1];
            split.forEach((modelId: any) => {
              if (modelId[0] === manId) {
                string = string.concat(".").concat(modelId[1]);
              }
            });
            return string;
          });
        }

        setFilterAndSort((value: FilterAndSort) => ({
          ...value,
          ForRent: values.ForRent,
          Mans: modelIds.length ? modelIdArray : values.Mans,
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
                    setStateFn={setManufacturerIds}
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
              <Label htmlFor="Mans">მოდელი</Label>
              <Field name="Mans" id="Mans">
                {({ field, form }: { field: any; form: any }) => {
                  const disabled =
                    form.values.Mans.every((item: any) => item === "") ||
                    form.values.Mans.length === 0;

                  const dataArr = selectedManufacturerModels || [];

                  return (
                    <CustomSelect
                      placeholder="მოდელი"
                      handleChange={handleSetModel}
                      isMulti
                      disabled={disabled}
                      field={field}
                      data={dataArr?.map((item: Model) => ({
                        value: item.model_id,
                        label: item.model_name,
                        man_id: item.man_id,
                      }))}
                    />
                  );
                }}
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
