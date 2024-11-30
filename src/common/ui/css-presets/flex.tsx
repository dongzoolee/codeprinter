import React from "react";
import { omit } from "lodash-es";
import styled, { css } from "styled-components";

import type { THTMLDivElementAttributes } from "../../typings/html-element-types";

const flexProperties = [
  {
    cssPropertyKey: "justify-content",
    propName: "justifyContent",
  },
  {
    cssPropertyKey: "row-gap",
    propName: "rowGap",
  },
  {
    cssPropertyKey: "column-gap",
    propName: "columnGap",
  },
  {
    cssPropertyKey: "gap",
    propName: "gap",
  },
  {
    cssPropertyKey: "align-items",
    propName: "alignItems",
  },
  {
    cssPropertyKey: "flex",
    propName: "flex",
  },
  {
    cssPropertyKey: "flex-grow",
    propName: "flexGrow",
  },
  {
    cssPropertyKey: "flex-wrap",
    propName: "flexWrap",
  },
] as const;

const flexPropNames = flexProperties.map((v) => v.propName);

type TFlexRowProps = THTMLDivElementAttributes & {
  [key in (typeof flexProperties)[number]["propName"]]?: React.CSSProperties[key];
};
export const FlexRow = styled((props: TFlexRowProps) => {
  const omittedProps = omit(props, flexPropNames) as THTMLDivElementAttributes;
  return <div {...omittedProps} />;
})`
  display: flex;

  ${(props) => {
    return flexProperties
      .filter(({ propName }) => props[propName])
      .map(({ cssPropertyKey, propName }) => {
        return css`
          ${cssPropertyKey}: ${props[propName]};
        `;
      });
  }}
`;

export const FlexCol = styled(FlexRow)`
  flex-direction: column;
`;
