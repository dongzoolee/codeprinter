import styled from "styled-components";

import { Header } from "./header";

const Children = styled.div``;
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
      </div>
    </>
  );
};

export const Page = styled(_Page)`
  max-width: 720px;

  margin: 0 auto;
  padding: 6rem 0;
`;
