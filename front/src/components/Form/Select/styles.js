import styled from 'styled-components';

export const CustomSelect = styled.div`
  min-width: 350px;
  position: relative;
  size: 40px;

  label {
    font-size: 16px;
    margin-bottom: 5px;
    padding-left: 5px;
  }
  
  select {
    appearance: none;
    /*  safari  */
    -webkit-appearance: none;
    /*  other styles for aesthetics */
    width: 100%;
    font-size: 16px;
    padding: 0.675em 6em 0.675em 1em;
    background-color: #fff;
    border: 1px solid #caced1;
    border-radius: 8px;
    color: #000;
    cursor: pointer;
    margin-top: 5px;
  }
  
  &::before,
  &::after {
    --size: 0.3rem;
    content: "";
    position: absolute;
    right: 1rem;
    pointer-events: none;
  }
  
  &::before {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-bottom: var(--size) solid black;
    top: 58%;
  }
  
  &::after {
    border-left: var(--size) solid transparent;
    border-right: var(--size) solid transparent;
    border-top: var(--size) solid black;
    top: 75%;
  }
`;

