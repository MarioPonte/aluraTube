import React from "react";
import { StyledRegisterVideo } from "./styles";
import { createClient } from "@supabase/supabase-js";

import config from "../../../config.json";

// Custom Hook
function useForm(propsDoForm){
    const [values, setValues] = React.useState(propsDoForm.initialValues);
    return {
        values,
        handleChange: (evento) => {
            const value = evento.target.value;
            const name = evento.target.name;
            setValues({
                ...values,
                [name]: value,
            });
        },
        clearForm(){
            setValues({});
        }
    };
}

const PROJECT_URL = "https://xmfivcpyskzxfpmfwyji.supabase.co";
const PUBLIC_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtZml2Y3B5c2t6eGZwbWZ3eWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxNzA1ODksImV4cCI6MTk4Mzc0NjU4OX0.xl3IqC1H1xE7rVSEUruF4HxxzFmNHAwFrPcaW7_MRks";
const supabase = createClient(PROJECT_URL, PUBLIC_KEY);

// get youtube thumbnail from video url
function getThumbnail(url){
    return `https://img.youtube.com/vi/${url.split("v=")[1]}/hqdefault.jpg`;
}


export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "", url: ""}
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

    const playlistNames = Object.keys(config.playlists);

    return (
        <StyledRegisterVideo>
            <button className="add-video" onClick={() => { setFormVisivel(true) }}>
                +
            </button>
            {formVisivel
                ? (
                    <form onSubmit={(evento) => {
                        evento.preventDefault();
                        //console.log(formCadastro.values);

                        // Contrato entre o nosso front e backend
                        supabase.from("video").insert({
                            title: formCadastro.values.titulo,
                            url: formCadastro.values.url,
                            thumb: getThumbnail(formCadastro.values.url),
                            playlist: "jogos",
                        })
                        .then((insResponse) => {
                            console.log(insResponse);
                        })
                        .catch((err) => {
                            console.log(err);
                        })

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => { setFormVisivel(false) }}>
                                X
                            </button>
                            <input
                                placeholder="Titulo do video"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange} />
                            <input
                                placeholder="URL"
                                name="url"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange} />

                            <select name="playlist" onChange={formCadastro.handleChange}>
                                <option key="Add Novos" value="Add Novos">Novos</option>
                                {playlistNames.map((playlistName) => {
                                    return (
                                        <option key={playlistName} value={playlistName}>{playlistName}</option>
                                    )
                                })}
                            </select>
                            <button type="submit">
                                Cadastrar
                            </button>
                        </div>
                    </form>
                )
                : false}
        </StyledRegisterVideo>
    )
}