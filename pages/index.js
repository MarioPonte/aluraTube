import React from "react";
import config from "../config.json";
import styled from "styled-components";
import Menu from "../src/components/Menu";
import { StyledTimeline } from '../src/components/Timeline';
import { StyledFavorite } from '../src/components/Favorite';
import { videoService } from "../src/services/videoService";

function HomePage() {
    const service = videoService();
    const [valorDoFiltro, setValorDoFiltro] = React.useState("");
    const [playlists, setPlaylists] = React.useState({});

    React.useEffect(() => {
        //console.log("useEffect");
        service.getAllVideos()
            .then((dados) => {
                //console.log(dados.data);
                const novasPlaylists = {...playlists};
                dados.data.forEach((video) => {
                    if(!novasPlaylists[video.playlist]) novasPlaylists[video.playlist] = [];
                    novasPlaylists[video.playlist].push(video);
                })
                setPlaylists(novasPlaylists);
            });
    }, []);

    //console.log("Playlists pronto",playlists);

    return (
        <>
            <div style={{
                display: "flex",
                flexDirection: "column",
                flex: 1,
                // backgroundColor: "red",
            }}>
                {/* Prop Drilling */}
                <Menu valorDoFiltro={valorDoFiltro} setValorDoFiltro={setValorDoFiltro} />
                <Header />
                {/* config.playlists */}
                <Timeline searchValue={valorDoFiltro} playlists={playlists} />
                <Favorite favorites = {config.favorites}/>
                <Footer />
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
    background-color: ${({ theme }) => theme.backgroundLevel1};

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

function Timeline({searchValue, ...props}) {
    const playlistNames = Object.keys(props.playlists);

    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                let countVideos = 0;
                // console.log(playlistName);
                // console.log(videos);
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos
                            .filter((video) => {
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized)
                            })
                            .map((video) => {
                                countVideos = countVideos + 1;
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                            {countVideos === 0 ? "Nenhum video encontrado" : ""}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}

function Favorite (props) {
    const favoriteNames = Object.keys(props.favorites)
    return(
    <div>
        {favoriteNames.map((favoriteName) => {
            const videos = props.favorites[favoriteName];
            return (
                <section key={favoriteName}>
                    <StyledFavorite>
                        <h2>
                            {favoriteName}
                        </h2>

                        {videos.map( (profile)=>{
                            return(
                                    <a className="profileLink" key={profile.url} href={profile.url}>
                                        <div>
                                            <img className="profilePicture" src={profile.thumb}/>
                                        </div>
                                        <span>{profile.title}</span>
                                    </a>
                                )
                            }
                        )}
                        
                    </StyledFavorite>
                </section>
            )
        })}
    </div>
    )
}

const StyledFooter = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};
    text-align: center;

    .companyLink{
        color: white;
    }

    footer{
        margin: 40px;
        font-size: 12px;
    }
`;
function Footer() {
    return (
        <StyledFooter>
            <footer>Feito por <a className="companyLink" href="https://marioponte.github.io/Portfolio/" target="_Blank">Mário Ponte</a> durante o evento Imersão React da plataforma <a className="companyLink" href="https://www.alura.com.br/" target="_Blank">Alura</a> © 2022</footer>
        </StyledFooter>
    )
}

export default HomePage