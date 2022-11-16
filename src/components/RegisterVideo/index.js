import React from "react";
import { useRouter } from 'next/router';
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
    const youTubeId = url.replace(/^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/, '$7');
    const thumbnail = `https://img.youtube.com/vi/${youTubeId}/hqdefault.jpg`;
    return thumbnail;
}


export default function RegisterVideo() {
    const formCadastro = useForm({
        initialValues: { titulo: "", url: ""}
    });
    const [formVisivel, setFormVisivel] = React.useState(false);

    const playlistNames = Object.keys(config.playlists);

    const router = useRouter();

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
                            playlist: formCadastro.values.playlist,
                        })
                        .then((insResponse) => {
                            console.log(insResponse);
                            router.reload()
                        })
                        .catch((err) => {
                            console.log(err);
                        })

                        setFormVisivel(false);
                        formCadastro.clearForm();
                    }}>
                        <div>
                            <button type="button" className="close-modal" onClick={() => { setFormVisivel(false) }}>
                                x
                            </button>
                            <input
                                placeholder="Titulo do video"
                                name="titulo"
                                value={formCadastro.values.titulo}
                                onChange={formCadastro.handleChange}
                                required />
                            <input
                                type="url"
                                placeholder="URL"
                                name="url"
                                value={formCadastro.values.url}
                                onChange={formCadastro.handleChange}
                                required />

                            <select name="playlist" defaultValue="" onChange={formCadastro.handleChange} required>
                                <option value="" disabled>
                                    Selecione uma playlist...
                                </option>
                                {playlistNames.map((playlistName) => {
                                    return (
                                        <option key={playlistName} value={playlistName}>{playlistName}</option>
                                    )
                                })}
                            </select>

                            <button type="submit">
                                Cadastrar
                            </button>

                            {formCadastro.values.url.length > 11 ? <> <img className="thumbPreview" src={getThumbnail(formCadastro.values.url)}  /> </>  : null }
                        </div>
                    </form>
                )
                : false}
        </StyledRegisterVideo>
    )
}