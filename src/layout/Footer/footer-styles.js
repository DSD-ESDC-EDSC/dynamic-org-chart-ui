import styled from 'styled-components';

export const FooterContainer = styled.div`
    background: #eceff1;
    border-top: 1px solid #cfd8dc;
    position: fixed;
    left: 0;
    bottom: 0;
    height: 5%;
    width: 100%;
    @media screen and (max-width: 800px) {
        height: 10%;
    }

`;

export const FooterFlexContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
`;

export const IconLinks = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    flex:1;
    margin-left: 2%;
    @media screen and (max-width: 800px) {
        flex: 1
    }
`;

export const OptionsIcon = styled.a`
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-decoration: none;

    margin: 0% 1%;
    @media screen and (max-width: 800px) {
        margin: 0% 3%;
    }
`;

export const OptionsImg = styled.img`
    height: 25px;
    width: 25px;
    @media screen and (max-width: 800px) {
    }
`;

export const Disclaimers = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    flex:1;
    @media screen and (max-width: 800px) {
        flex: 2
    }
`;

export const Disclaimer = styled.p`
    font-size: 12px;
    margin-left: 1%;
    margin-right: 1%;
    margin-bottom: 0%;
    @media screen and (max-width: 800px) {
        font-size: 10px;
    }
`;

export const DisclaimerLink = styled.a`
    font-size: 12px;
    margin-left: 5px;
    &:hover {
        color: #dc006c;
    }
    @media screen and (max-width: 800px) {
        font-size: 10px;
    }
`;

export const Separator = styled.p`
    font-weight: 400;
    font-size: 18px;
    margin-bottom: 0%;
`;