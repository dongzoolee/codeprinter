import styled from "styled-components";

const _Footer = ({ className }: { className?: string }) => {
  return (
    <footer className={className}>
      <span>Copyright 2024 © dongzoolee. All Rights Reserved.</span>
      <br />
      <br />
      <span>
        For issues or feedback, please leave issues on{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://github.com/dongzoolee/codeprinter"
        >
          Github
        </a>
      </span>
    </footer>
  );
};
export const Footer = styled(_Footer)`
  font-size: 1.2rem;
  line-height: 1rem;
  color: ${({ theme }) => theme.color.gray[500]};
`;
