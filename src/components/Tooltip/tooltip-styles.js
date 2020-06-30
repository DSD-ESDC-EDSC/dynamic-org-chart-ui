import styled from 'styled-components';

export const ToolTipForeignObject = styled.foreignObject`
    display: none;

    opacity: 0;
    z-index: 1;
    
    x: ${props => (props.xScale ? props.xScale  - 85 : 0)};
    y: ${props => (props.yScale ? props.yScale - 75 : 0)};
    
    width: 120px;
    height: 30px;

    margin: 1%;
`;

export const ToolTipButtonGroupDiv = styled.div`
    margin-top: 5%;    

    display: flex;
    flex-direction: row;

    border: 1px solid #fff;
    border-radius: 2px;

    width: 100%;
`;

export const ToolTipInnerButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    
    background: #282828;
    color: #fff;
    border: 2px solid #fff;
    border-radius: 2px;
    
    font-weight: 300;
    font-size: 14px;

    outline: none;
`;