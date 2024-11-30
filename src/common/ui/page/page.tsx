import styled from "styled-components";

import { Header } from "./header";
import { Footer } from "./footer";

const Children = styled.div`
  margin: 2.4rem 0;
`;
const _Page = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <div className={className}>
        <Header />
        <Children>{children}</Children>
        <Footer />
      </div>
    </>
  );
};

export const Page = styled(_Page)`
  max-width: 720px;

  margin: 0 auto;
  padding: 6rem 0;
`;
