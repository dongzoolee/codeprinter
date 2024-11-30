declare module "styled-components" {
  export interface DefaultTheme extends TLeedTheme {}
}

type TLeedTheme = typeof theme;

export const theme = {
  font: {
    weight: {
      thin: 100,
      extraLight: 200,
      light: 300,
      regular: 400,
      medium: 500,
      semiBold: 600,
      bold: 700,
      extraBold: 800,
      black: 900,
    },
  },
  color: {
    black: "var(--black)",
    gray: {
      100: "#f5f5f5",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#bdbdbd",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  unit: {
    vh: (size: number) => {
      return `calc(var(--vh, 1vh) * ${size})`;
    },
  },
  preset: {
    nonDraggable: ` user-drag: none;
    -webkit-user-drag: none;
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;`,
  },
} as const;
