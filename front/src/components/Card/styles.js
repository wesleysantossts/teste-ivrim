import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
  background: #444;
  color: #ddd;
  border-radius: 5px;
  margin-bottom: 10px;
  padding: 15px;
  box-shadow: 0 1px 4px 0 rgba(192, 208, 230, 0.8);
  border-top: 20px solid rgba(230, 236, 245, 0.4);
  cursor: grab;

  header {
    position: absolute;
    width: 100%;
    top: -22px;
    left: 15px;
  }

  p {
    font-weight: 500;
    line-height: 20px;
    
  }
  
  strong {
    line-height: 25px;
    font-size: 16px;
  }

  img {
    width: 24px;
    height: 24px;
    border-radius: 2px;
    margin-top: 5px;
  }

  .close-btn {
    position: absolute;
    right: 20px;
    top: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    padding-right: 5px;
    box-shadow: 10px 100 10 black;
    
    button {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      background-color: #f30;
      opacity: 0.7;
      border: none;
      border-radius: 50%;
      color: white;
      cursor: pointer;
    }
  }


  ${props => props.isDragging && css`
    border: 2px dashed #999;
    padding-top: 31px;
    border-radius: 0;
    background: transparent;
    box-shadow: none;
    cursor: grabbing;

    p, img, header {
      opacity: 0;
    }

  `}
`;

export const Label = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 3px;
  display: inline-block;
  background: ${props => props.color};
`;