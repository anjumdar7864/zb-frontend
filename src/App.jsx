import Routes from "@/Routes";
import { GlobalContextProvider } from "./context";
import { Provider } from "react-redux";
import store from "./store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { GoogleOAuthProvider } from '@react-oauth/google';
import 'react-sweet-progress/lib/style.css';


const App = () => {
    
    
    return (
        <GlobalContextProvider>
            <Provider store={store}>
            <GoogleOAuthProvider 
            clientId={`${import.meta.env.VITE_APP_CLIENT_ID}`}
          
            >
                <DndProvider backend={HTML5Backend}>
                    <Routes />
                </DndProvider>
                </GoogleOAuthProvider>
            </Provider>
        </GlobalContextProvider>
    );
};

export default App;
