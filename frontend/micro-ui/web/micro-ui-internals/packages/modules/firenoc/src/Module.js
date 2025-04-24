import React from "react";
import { useRouteMatch } from "react-router-dom";
import FireNocCard from "./components/FirenocCard";




export const FireNocModule = ({ stateCode, userType, tenants }) => {
 <div>FireNOc</div>
};

// Register components to be used in DIGIT's Component Registry
const componentsToRegister = {
 FireNocCard,
 FireNocModule
};

// Initialize and register module components
export const initFireNocComponents = () => {
  
  Object.entries(componentsToRegister).forEach(([key, value]) => {
    Digit.ComponentRegistryService.setComponent(key, value);
  });
};


