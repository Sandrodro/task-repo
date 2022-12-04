import { FilterAndSort } from "../../types";

import { StyledSelect, SelectContainer } from "./SortStyles";

interface IProps {
  setFilterAndSort: any;
}

const Sort = ({ setFilterAndSort }: IProps) => {
  return (
    <SelectContainer>
      <StyledSelect
        onChange={(e: any) =>
          setFilterAndSort((state: FilterAndSort) => ({
            ...state,
            Period: e.target.value,
          }))
        }
      >
        <option value="1h">ბოლო 1 საათი</option>
        <option value="2h">ბოლო 2 საათი</option>
        <option value="3h">ბოლო 3 საათი</option>
        <option value="1d">ბოლო 1 დღე</option>
        <option value="2d">ბოლო 2 დღე</option>
        <option value="3d">ბოლო 3 დღე</option>
        <option value="1w">ბოლო 1 კვირა</option>
        <option value="2w">ბოლო 2 კვირა</option>
        <option value="3w">ბოლო 3 კვირა</option>
      </StyledSelect>

      <StyledSelect
        onChange={(e: any) =>
          setFilterAndSort((state: FilterAndSort) => ({
            ...state,
            SortOrder: e.target.value,
          }))
        }
      >
        <option value={"1"}>თარიღი კლებადი</option>
        <option value={"2"}>თარიღი ზრდადი</option>
        <option value={"3"}>ფასი კლებადი</option>
        <option value={"4"}>ფასი ზრდადი</option>
        <option value={"5"}>გარბენი კლებადი</option>
        <option value={"6"}>გარბენი ზრდადი</option>
      </StyledSelect>
    </SelectContainer>
  );
};

export default Sort;
