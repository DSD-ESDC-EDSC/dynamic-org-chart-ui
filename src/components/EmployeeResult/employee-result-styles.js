import styled from 'styled-components';

export const EmployeeResultOuterDiv = styled.div`
    border-bottom: 0.25px solid #fff !important;

    padding-top: 2%;
`;

export const NameTitleDiv = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

export const NameText = styled.p`
    color: #fff;
    flex: 1;

    font-size: 10px;
    text-align: left;

    padding: 0;
    margin: 0;
`;

export const TitleText = styled.p`
    color: #fff;
    flex: 2;

    text-align: right;

    font-size: 10px;

    padding: 0;
    margin: 0;
`;

export const BusinessUnitDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

`;

export const BusinessUnitText = styled.p`
    color: #fff;
    font-size: 10px;
    
    padding: 0;
    margin: 0;
`;

export const BusinessUnitLink = styled.a`
    color: #05cefc !important;
    font-size: 10px;
    text-decoration: underline !important;

    cursor: pointer;
    
    padding: 0;
    margin: 0;
`;

export const ContactInfoDiv = styled.div`
    display: flex;
    flex-direction: row;
`;

export const ContactInfoText = styled.p`
    flex: 1;
    color: #fff;

    font-size: 9px;

    padding: 0;
    margin: 0;
`;