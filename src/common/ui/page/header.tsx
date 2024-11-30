import styled from "styled-components";

import PrinterSvg from "./printer.svg";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.6rem;

  font-size: 3.2rem;

  font-family: "Inter";
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-style: italic;
`;
const LogoImg = styled.img.attrs({
  src: PrinterSvg,
  alt: "printer-icon",
})`
  width: 2.8rem;
`;
const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;
const _Header = ({ className }: { className?: string }) => {
  return (
    <header className={className}>
      <Nav>
        <LogoWrapper>
          <LogoImg />
          CodePrinter
        </LogoWrapper>
      </Nav>
    </header>
  );
};
export const Header = styled(_Header)``;
