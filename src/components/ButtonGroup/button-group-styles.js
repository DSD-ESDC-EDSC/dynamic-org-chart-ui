import styled from 'styled-components';

export const ButtonGroupDiv = styled.div`
    margin-top: 5%;    

    display: flex;
    flex-direction: row;
    
    border: 1px solid #fff;
    border-radius: 2px;

    width: 92.5%;

    
`;

export const InnerButton = styled.button`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    flex: 1;

    border: ${props => props.activeButton ? "1px solid #fff": "1px solid #fff"};
    
    background: ${props => props.activeButton ? "rgba(41,41,41,0.3)" : "#fff"};
    color: ${props => props.activeButton ? "#fff" : "#282828"};
    padding-top: 1%;
    padding-bottom: 1%;
    
    font-weight: 300;
    font-size: 16px;

    outline: none;

`;