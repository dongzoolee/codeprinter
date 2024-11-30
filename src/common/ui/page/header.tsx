import styled from "styled-components";

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  column-gap: 0.6rem;

  font-size: 3.2rem;

  font-family: "Inter";
  font-weight: ${({ theme }) => theme.font.weight.bold};
  font-style: italic;
`;
const Nav = styled.nav`
  display: flex;
  justify-content: flex-start;
  align-items: baseline;
  flex-wrap: wrap;

  gap: 1rem;
`;
const Slogan = styled.span`
  font-size: 1.4rem;
`;
const _Header = ({ className }: { className?: string }) => {
  return (
    <header className={className}>
      <Nav>
        <LogoWrapper>CodePrinter</LogoWrapper>
        <Slogan>Print beautiful, prettified code</Slogan>
      </Nav>
    </header>
  );
};
export const Header = styled(_Header)``;
