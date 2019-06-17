/**
 * @format
 */

import { Navigation } from "react-native-navigation";
import Home from "./screens/home";
import Sign from "./screens/second";
import Patient from "./screens/patient";
import Create from "./screens/create";
import Login from "./screens/Login";
import { Provider } from "react-redux";
import { store } from "./store";
//import Second from "./screens/second";
console.disableYellowBox = true;
Navigation.registerComponentWithRedux("Home", () => Home, Provider, store);
Navigation.registerComponentWithRedux("Sign", () => Sign, Provider, store);
Navigation.registerComponentWithRedux(
    "Patient",
    () => Patient,
    Provider,
    store
);
Navigation.registerComponentWithRedux("Login", () => Login, Provider, store);
Navigation.registerComponentWithRedux("Create", () => Create, Provider, store);
Navigation.events().registerAppLaunchedListener(() => {
    Navigation.setDefaultOptions({
        topBar: {
            visible: false,
            drawBehind: true,
            animate: false,
            _height: 0
        }
    });
    Navigation.setRoot({
        root: {
            stack: {
                id: "Appstack",
                children: [
                    {
                        component: {
                            name: "Home",
                            options: {
                                topBar: {
                                    title: {
                                        text: "iCare Flow"
                                    }
                                }
                            }
                        }
                    }
                ]
            }
        }
    });
});
