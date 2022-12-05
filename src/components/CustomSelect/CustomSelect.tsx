import { useState } from "react";
import Select, { components } from "react-select";

import { useFormikContext } from "formik";

import { Colors } from "../../constants";

interface IProps {
  data: any;
  field: any;
  placeholder: string;
  isMulti: boolean;
  disabled?: boolean;
  setStateFn?: Function;
  handleChange?: Function;
}

const CustomSelect = ({
  data,
  field,
  placeholder,
  isMulti,
  disabled = false,
  setStateFn,
  handleChange,
}: IProps) => {
  const [optionSelected, setOptionSelected] = useState(null);

  const formik = useFormikContext();

  const onChange = (option: any) => {
    setOptionSelected(option);
    if (isMulti) {
      if (handleChange) {
        handleChange(option);
      }
      if (setStateFn) {
        setStateFn(option.map((item: any) => parseInt(item.value)));
      }
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
          color: Colors.GREY,
        }),
        control: (base, state) => ({
          ...base,
          cursor: "pointer",
        }),
        multiValue: (baseStyles, state) => ({
          ...baseStyles,
          background: "white",
          width: "80px",
        }),
        multiValueRemove: (baseStyles, state) => ({
          display: "none",
        }),
        indicatorSeparator: () => ({
          display: "none",
        }),
        valueContainer: (base, state) => ({
          ...base,
          overflowY: "hidden",
          overflowX: "hidden",
          fontSize: "13px",
          fontWeight: "500",
          color: Colors.GREY,
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
          color: Colors.GREY,
        }),
        option: (base) => ({
          ...base,
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }),
      }}
      isDisabled={disabled}
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
        />
        <label>{props.label}</label>
      </components.Option>
    </div>
  );
};

export default CustomSelect;
