import { useState } from "react";
import Menu from "../src/components/Menu/index"
import styled from "styled-components";
import VideoPlayer from "../src/components/videoPlayer";

const StyledVideo = styled.div`
    display: flex;
    flex-direction: column;
    flex: 100vw;
`;

const Video = () => {
    const [searchValue, setSearchValue] = useState("");

    return (
        <StyledVideo>
            <Menu searchValue={searchValue} setSearchValue={setSearchValue} />
            <VideoPlayer />
        </StyledVideo>
    )
}

export default Video;