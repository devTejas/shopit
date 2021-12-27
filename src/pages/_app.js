import { Provider as AuthProvider } from "next-auth/client";
import { ThemeProvider } from "next-themes";
import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/globals.css";

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
        <ThemeProvider attribute="class">
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  );
};

export default MyApp;
