import styled from 'styled-components';

export const BetaBannerDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 2.5%;
    background: #282828;
    border-bottom: 0.25px solid #cfd8dc;
    box-shadow: 0 2.5px 5px rgba(0,0,0,0.2);
    @media screen and (max-width: 1050px) {
        
    }
`;
export const BetaLogoStyle = styled.div`
    color: #dc006c;
    margin: 0.5% 2%;
    @media screen and (max-width: 800px) {
        font-size: 10px;
    }
`;

export const BetaTextStyle = styled.div`
    color: #fff;
    margin: 0.5% 2%;
    @media screen and (max-width: 800px) {
        font-size: 10px;
    }  
`;

export const FeedbackContainer = styled.div`
    margin-left: auto;
    width: 25%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @media screen and (max-width: 800px) {
        font-size: 10px;
    }  
`;

export const Feedback = styled.a`
    color: #fff;
    
    margin: 0% 2%;

    &:hover {
        color: #dc006c;
    }
`;

export const EmailButton = styled.img`
    width: 20px;
    height: 20px;
    @media screen and (max-width: 800px) {
        display: None;
    }  
`;
