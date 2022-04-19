import styled from "styled-components";

const Wrapper = styled.main`
  nav {
    max-width: var(--max-width);
    width: var(--fluid-width);
    height: var(--nav-height);
    margin: 0 auto;
    display: flex;
    align-items: center;
  }

  .page {
    display: grid;
    grid-template-columns: 1;
    align-items: center;
    margin-top: -3rem;
    min-height: calc(100vh - var(--nav-height));
    @media (min-width: 992px) {
      grid-template-columns: repeat(2, 1fr);
      gap: 3rem
    }
  }

  h1 {
    font-weight: 700;
  }
  span {
    color: var(--primary-500);
  }
  p {
    color: var(--grey-600);
  }
`;

export default Wrapper;
