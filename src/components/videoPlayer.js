import { useRouter } from "next/router";
import styled from "styled-components";


const StyledVideoPlayer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 20px;
    flex: 1;
    div {
        width: 50vw;
        background-color: ${({ theme }) => theme.backgroundLevel1};
        padding: 20px;
        border-radius: 20px;
    }
    .title {
        padding: 10px;
        background-color: ${({ theme }) => theme.backgroundLevel2};
        border-radius:10px;
    }
    iframe {
        border-radius: 20px;
        border: none;
        margin-bottom: 5px;
        width: 45vw;
    }

    .backButton{
        color: ${({ theme }) => theme.textColorBase};
        margin: 20px;
    }
`;

const VideoPlayer = () => {
    const router = useRouter();
    return (
        <StyledVideoPlayer>
            <div>
                <iframe
                width="896"
                height="504"
                src={`https://www.youtube.com/embed/${router.query.v}`}
                title="Youtube Video Player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                ></iframe>
                <h2 className="title">{router.query.title}</h2>
            </div>
            <a className="backButton" href="/">Voltar á página inicial</a>
        </StyledVideoPlayer>
    )
}

export default VideoPlayer;