import { createRoot } from "react-dom/client";
import { ThemeProvider as SCThemeProvider } from "styled-components";

import { theme } from "./common/theme.ts";

import { App } from "./App.tsx";
import { useVhInitializer } from "./hooks/use-vh-initializer.ts";
import "./styles/fonts.scss";
import "./styles/global.scss";

const RootElement = () => {
  useVhInitializer();

  return (
    <SCThemeProvider theme={theme}>
      <App />
    </SCThemeProvider>
  );
};

createRoot(document.getElementById("root")!).render(<RootElement />);
