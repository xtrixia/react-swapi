import styled from "styled-components";

const Header = styled.div`
  cursor: not-allowed;
  padding: 10pt;
  -webkit-animation: mymove 5s infinite;
  animation: mymove 5s infinite;

  @keyframes mymove {
    from {
      background-color: red;
    }
    to {
      background-color: blue;
    }
  }
`;

export default Header;
