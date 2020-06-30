import styled from 'styled-components';
import FontAwesome from 'react-fontawesome';

export const DropDownWrapper = styled.div`
margin: 2% 0%;
width: 92.5%;

cursor: pointer;

position: relative;
`;

export const DropDownHeader = styled.div`
display: flex;
justify-content: space-between;
align-items: center;

padding: 0.5% 0%;

background: #fff;
border-radius: 1.5px;

border-bottom: 0.5px solid rgba(41, 41, 41, 0.5);
`;

export const DropDownHeaderTitle = styled.div`
color: #282828;

font-size: 16px;
font-weight: 300;

margin-left: 2.5%;
`;

export const DropDownArrow = styled(FontAwesome)`
margin-right: 5%;
`;


export const DropDownCheck = styled.div`
float: right;
vertical-align: middle;
margin-right: 5%;
`;

export const DropDownUnorderedList = styled.ul`
z-index: 10;
position: absolute;
width: 100%;
background-color: white;

max-height: 500%;
overflow-y: scroll;
-webkit-overflow-scrolling: touch;

animation: move-in-down 0.1s ease-out;
@keyframes move-in-down {
    0% {
        opacity: 0;
        transform: translateY(-10px);
    }
    100% {
        opacity: 1;
        transform: translateY(0);
    }
}
`;

export const DropDownListItem = styled.li`
width: 100%;

margin-top: 1%;

cursor: pointer;

display: inline-block;
white-space: nowrap;
text-overflow: ellipsis;

font-weight: 300;
font-size: 14px;
text-indent: 2.5%;

border-bottom: 0.25px solid rgba(41, 41, 41, 0.5);

&.selected{
    color: white;
    background-color: rgba(41, 41, 41, 0.3);
}

&:hover{
    font-weight: 400;
    color: white;
    background-color: rgba(41, 41, 41, 0.2);
}
`;