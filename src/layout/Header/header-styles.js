import styled from 'styled-components';

import { Link } from 'react-router-dom';

export const HeaderContainer = styled.header`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 5%;
    background: #eee;
    border-bottom: 0.5px solid #cfd8dc;
    color: #000;
    text-align: center;
    padding: 0% 2%;
    font-weight: 200;
    @media screen and (max-width: 800px) {
        width: 100%;
    }
`;

export const AcronymLogo = styled.div`
    display: flex;
    flex-direction: row;
    flex: 3;
    justify-content: flex-start;
    align-items: center;
    @media screen and (max-width: 1400px) and (min-width: 801px) {
        flex: 5;
    }
    @media screen and (max-width: 950px) {
        display: none; 
    }
`;

export const Title = styled.h1`
    font-weight: 200;
    font-size: 28px;
    margin-left: 5%;
    margin-bottom: 0;
    @media screen and (max-width: 800px) {
        display: none;   
    }
`;

export const OptionsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    flex: 5;
    width: 50%;
    @media screen and (max-width: 1400px) and (min-width: 801px) {
        justify-content: center;
    }
    @media screen and (max-width: 950px) {
        justify-content: flex-start;
        width: 50%;
    }
`;

export const OptionsLink = styled(Link)`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    font-weight: 300;
    color: #000;
    text-decoration: none;
    margin: 0% 2% 0%;
    &:hover {
        transform: translateY(-1.5px);
        box-shadow: 0 2px 5px rgba(0,0,0,0.);
    }

    &:active {
        transform: translateY(-0.5px);
        box-shadow: 0 1px 2.5px rgba(0,0,0,0.1);
    }
    @media screen and (max-width: 800px) {
        display: none;
    }
`;

export const OptionsIcon = styled(Link)`
    display: none;
    justify-content: space-between;
    align-items: center;
    padding: 3%;
    text-decoration: none;
    @media screen and (max-width: 800px) {
        display: flex;
        margin: 0% 2%;
    }
`;

export const HeaderButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    @media screen and (max-width: 800px) {
        width: 50%;
        justify-content: flex-end;
    }
`;

export const HeaderButton = styled.button`
    margin: 2%;
    &:hover {
        transform: translateY(-1.5px);
        box-shadow: 0 2px 5px rgba(0,0,0,0.);
    }

    &:active {
        transform: translateY(-0.5px);
        box-shadow: 0 1px 2.5px rgba(0,0,0,0.1);
    }
    @media screen and (max-width: 800px) {
        
    }
`;