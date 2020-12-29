import React from 'react';
import {Provider} from "react-redux";
import {store} from "./src/businessLogicLayer/store";
import {MainApp} from "./src/userInterface/MainApp";

export default function App() {
    return (
        <Provider store={store}>
            <MainApp/>
        </Provider>
    );
}


// <SafeAreaProvider>
//   <Navigation colorScheme={colorScheme} />
//   <StatusBar />
// </SafeAreaProvider>
