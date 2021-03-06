import { createGlobalStyle, ThemeProvider } from "styled-components";
import Router from "./Router";
import { ReactQueryDevtools } from "react-query/devtools";
import Nav from "./components/Nav";
import { darkTheme, lightTheme } from "./theme";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "./atom";
import Footer from "./components/Footer";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Titillium+Web:wght@300;400&display=swap');
  html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font: inherit;
  vertical-align: baseline;
}
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
*[hidden] {
    display: none;
}
body {
  line-height: 1;
  font-family: 'Titillium Web', sans-serif;
  font-weight: 400;
  background-color: ${(props) => props.theme.bgColor};
  color: ${(props) => props.theme.textColor};
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
a {
  text-decoration: none;
  color: ${(props) => props.theme.textColor};
}
`;

function App() {
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Nav />
        <Router />
        <Footer />
        <ReactQueryDevtools />
      </ThemeProvider>
    </>
  );
}

export default App;
