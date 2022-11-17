import React from "react";
import { ThemeProvider } from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import ColorModeProvider, { ColorModeContext } from "../src/components/Menu/components/ColorMode";
import Head from 'next/head';
import RegisterVideo from "../src/components/RegisterVideo";

const theme = {
    light: {
        backgroundBase: "#D5F0FF",
        backgroundLevel1: "#E6F6FF",
        backgroundLevel2: "#A5DFFF",
        borderBase: "#A5DFFF",
        textColorBase: "#001520",
    },
    dark: {
        backgroundBase: "#001520",
        backgroundLevel1: "#001C2C",
        backgroundLevel2: "#002B43",
        borderBase: "#002B43",
        textColorBase: "#D5F0FF",
    }
};

// _app.js -> Global setings from NextJS
// ThemeProvider -> Prover o tema para a app toda
// ColorModeProvider -> Prover o state de dark ou light mode para todo o mundo

function ProviderWrapper(props) {
    return (
        <ColorModeProvider initialMode={"dark"} >
            {props.children}
        </ColorModeProvider>
    )
}

function Root({ Component, pageProps }) {
    const contexto = React.useContext(ColorModeContext);

    return (
            <ThemeProvider theme={theme[contexto.mode]}>
                <CSSReset />

                <Head>
                    <title>aluraTube</title>
                    <link rel="icon" href="/images/aluratubeIcon.ico" />
                </Head>

                <Component {...pageProps} />
                <RegisterVideo />
            </ThemeProvider>
    )
}

export default function _App(props) {
    return (
        <ProviderWrapper>
            <Root {...props} />
        </ProviderWrapper>
    )
};