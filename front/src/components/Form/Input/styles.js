import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  label {
    font-size: 16px;
    margin-bottom: 5px;
    padding-left: 5px;
  }

  input {
    border-radius: 8px;
    border: .5px solid #ccc;
    height: 40px;
    padding: 0 8px;
    font-size: 16px;
  }
`;