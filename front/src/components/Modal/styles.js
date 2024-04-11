import styled from 'styled-components';

export const modalStyle = {
  overlay: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent'
  },
  content: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 'auto',
    backgroundColor: 'white',
    width: '500px',
    height: '400px',
    border: 'none',
    borderRadius: '15px',
  }
};

export const Container = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
  
  .title {
    font-size: 28px;
    font-weight: bold;
    color: black;
    text-align: center;
    margin-bottom: 20px;
  }
`;