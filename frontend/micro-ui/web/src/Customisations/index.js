import { ptComponents } from "./pt";
import { tlComponents } from "./tl";

// var Digit = window.Digit || {};

const customisedComponent = {
    ...ptComponents,
    ...tlComponents
}



export const initCustomisationComponents = () => {
    console.log(window.Digit) ;
    Object.entries(customisedComponent).forEach(([key, value]) => {
        window.Digit.ComponentRegistryService.setComponent(key, value);
    });
};


