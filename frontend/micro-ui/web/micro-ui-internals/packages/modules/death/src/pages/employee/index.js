import React from "react";
import { PrivateRoute } from "@egovernments/digit-ui-react-components";
import { Switch } from "react-router-dom/cjs/react-router-dom.min";

const EmployeeApp = ({ path, url, userType }) => {
    return (
      <Switch>
        <React.Fragment>
        <div className="ground-container" >
            
            <PrivateRoute
              path={`${path}`}
              component={() => (
                <div>Death Module</div>
              )}
            />
            
          </div>
        </React.Fragment>
      </Switch>
    );
  };
  
  export default EmployeeApp;
  