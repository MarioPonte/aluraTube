import styled from "styled-components";

export const StyledFavorite = styled.div`
    
    float: left;
    margin: 35px;

    .profilePicture{
        border-radius: 100vw;
        width: 100px;
    }

    .profileLink{
        vertical-align: top;
        text-align: center;
        text-decoration: none;
        color: ${({ theme }) => theme.textColorBase };
        display: inline-block;
        margin: 16px;
    }
`;