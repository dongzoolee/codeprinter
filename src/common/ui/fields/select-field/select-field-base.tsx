import { forwardRef, useEffect, useRef, useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import AntdSelect, { SelectProps } from "antd/es/select";
import type { BaseSelectRef } from "rc-select";

const SelectStyles = createGlobalStyle`
  .ant-select-selector {
    border: unset !important;
  }
`;

type TSelectWithOptionInputFieldProps = Omit<
  SelectProps<string>,
  "value" | "onChange" | "options"
> & {
  value: string;
  onChange: (value: any) => void;

  options: { label: string; value: string }[];

  optionInputProps: {
    error: string;
    onSubmit: (optionInput: string) => void;
  };
};

const _SelectFieldBase = forwardRef<
  HTMLDivElement,
  TSelectWithOptionInputFieldProps
>(({ value, onChange, options, optionInputProps, ...selectProps }, ref) => {
  const [_internalError, _setInternalError] = useState("");
  useEffect(() => {
    _setInternalError(optionInputProps.error);
  }, [optionInputProps.error]);

  // NOTE: Antd 측 버그로 'forwardRef'를 사용하여 Select에 ref를 전달할 수 없음
  // See: https://github.com/ant-design/ant-design/issues/18400#issuecomment-595640952
  const selectRef = useRef<BaseSelectRef>(null);

  return (
    <div ref={ref} style={{ width: "100%" }}>
      <SelectStyles />
      <AntdSelect
        ref={selectRef}
        value={value}
        onChange={onChange}
        placeholder=""
        style={{
          width: "100%",
          height: "100%",
          display: "block",
        }}
        dropdownStyle={{
          width: "auto",
        }}
        dropdownRender={(menu) => <>{menu}</>}
        options={options}
        {...selectProps}
      />
    </div>
  );
});

export const SelectFieldBase = styled(_SelectFieldBase)``;
