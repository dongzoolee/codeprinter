import styled from "styled-components";
import { Button as AntdButton, ButtonProps as AntdButtonProps } from "antd";

export type TButtonProps = AntdButtonProps;
const _Button = (props: TButtonProps) => {
  return <AntdButton {...props} />;
};
export const Button = styled(_Button)``;
