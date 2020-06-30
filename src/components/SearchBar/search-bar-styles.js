import styled from 'styled-components';

export const SearchBarDiv = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    width: 92.5%;
    margin: 2% 0%;

    @media screen and (max-width: 1100px) {
        width: 92.5%;
        margin: 2% 0%;
    }
`;

export const FormStyle = styled.form`
    width: 100%;

    display: flex;
    flex-direction: row;

    text-align: center;
    
`;

export const SearchBarStyle = styled.input`
    flex: 10;
    font-weight: 300;

    padding-left: 2.5%;

    border: 1px solid #282828;
    border-radius: 2px;
    outline: none;
    color: #282828;

    ::placeholder,
    ::-webkit-input-placeholder {
        font-weight: 300;

        color: rgba(41, 41, 41, 0.5);
    }
    :-ms-input-placeholder {
        font-weight: 400;

        color: rgba(41, 41, 41, 0.5);
    }
    @media screen and (max-width: 1100px) {
        width: 92.5%;
        margin: 2% 0%;
    }
`;

export const SubmitButtonStyle = styled.button`
    flex: 1;
    display: inline-block;
    text-align: center;
    
    border: 1px solid #282828;
    border-radius: 2px;
    background: "#fff";
    color: #282828;

    outline: none;

    font-weight: 400;
    font-size: 12px;

    @media screen and (max-width: 1100px) {
        width: 92.5%;
        margin: 2% 0%;
    }
`;