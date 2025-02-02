// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "sonner";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from 'react-redux'
import  store  from './redux/Store/Store.tsx'




createRoot(document.getElementById("root")!).render(

    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_OAUTH_KEY}>
      <Toaster richColors position="top-right" />
      <Provider store={store}>
     
      <App />
      
      </Provider>,
    </GoogleOAuthProvider>

);
