import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import {
  AppBar,
  Box,
  Container,
  CssBaseline,
  Toolbar,
  Typography,
} from "@mui/material";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Multi-Step Form</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <AppBar position="fixed">
        <Toolbar variant="dense">
          <Typography variant="h6">FieldArray Form</Typography>
        </Toolbar>
      </AppBar>
      <CssBaseline />
      <Container>
        <Box marginTop={10}>
          <Component {...pageProps} />
        </Box>
      </Container>
    </>
  );
}
