import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from '../src/components/Timeline'

function HomePage() {
    const estilosDaHomePage = { 
        // backgroundColor: "red"
    };

    return (
        <>
            <CSSReset />
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                <Menu />
                <Header />
                <Timeline playlists={config.playlists} />
                <Favorites favorites={config.favorites} />
            </div>
        </>
    )
}

/*
function Menu() {
    return (
        <div>Menu</div>
    )
}
*/

const StyledHeader = styled.div`
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info{
        margin-top: 10px;
        display:flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
    .user-banner{
        margin-top: 50px;
        height: 260px;
        background: url(${config.banner}) center center;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
    }
`;
function Header() {
    return (
        <StyledHeader>
            <section className="user-banner">
            </section>
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h2>
                        {config.name}
                    </h2>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    )
}

function Timeline(props) {
    const playlistNames = Object.keys(props.playlists);

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                console.log(playlistName);
                console.log(videos);
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

function Favorites(props) {
    const favoritesNames = Object.keys(props.favorites);

    return (
        <div>
            {favoritesNames.map((favoriteName) => {
                const profiles = props.favorites[favoriteName];
                return (
                    <section key={favoriteName}>
                        <h2>Favorites</h2>
                        <div>
                            
                            {/* {profiles.map((profile) => {
                                return (
                                    <a key={profile.url} href={profile.url}>
                                        <img src={profile.profilePicture} />
                                        <span>
                                            {profile.name}
                                        </span>
                                    </a>
                                )
                            })} */}
                        </div>
                    </section>
                )
            })}
        </div>
    )
}

export default HomePage