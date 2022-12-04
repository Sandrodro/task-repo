import { Component, useState } from "react";
import Select, { components } from "react-select";

import { useFormikContext } from "formik";

interface IProps {
  data: any;
  field: any;
  placeholder: string;
  isMulti: boolean;
}

const CustomSelect = ({ data, field, placeholder, isMulti }: IProps) => {
  const [optionSelected, setOptionSelected] = useState(null);

  const formik = useFormikContext();

  const onChange = (option: any) => {
    setOptionSelected(option);
    if (isMulti) {
      formik.setFieldValue(
        field.name,
        option.map((item: any) => item.value)
      );
    } else {
      formik.setFieldValue(field.name, option?.value || "");
    }
  };

  return (
    <Select
      styles={{
        container: (baseStyles, state) => ({
          ...baseStyles,
          width: "100%",
          fontSize: "13px",
          fontWeight: "500",
          color: "#6F7383",
        }),
        multiValue: (baseStyles, state) => ({
          ...baseStyles,
          background: "white",
        }),
        multiValueRemove: (baseStyles, state) => ({
          display: "none",
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
        valueContainer: (base) => ({
          ...base,
          overflowY: "hidden",
          fontSize: "13px",
          fontWeight: "500",
          color: "#6F7383",
          display: "flex",
          flexFlow: "row nowrap;",
        }),
        placeholder: (base) => ({
          ...base,
          width: "100%",
        }),
        menu: (base) => ({
          ...base,
          fontSize: "13px",
          fontWeight: "500",
          color: "#6F7383",
        }),
      }}
      options={data}
      isMulti={isMulti}
      isClearable={true}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      placeholder={placeholder}
      components={{
        Option,
      }}
      onChange={onChange}
      value={optionSelected}
    />
  );
};

const Option = (props: any) => {
  return (
    <div>
      <components.Option {...props}>
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={() => null}
        />{" "}
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export default CustomSelect;
