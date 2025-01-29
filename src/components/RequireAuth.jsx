import React from "react";
import {useAuth, RedirectToSignIn} from "@clerk/clerk-react";

const RequireAuth = ({children}) => {
    const {isSignedIn} = useAuth();

    // console.log("User Signed In:", isSignedIn);
    
    if(!isSignedIn)
    {
        return <RedirectToSignIn/>;
    }

    return <>{children}</>;
};

export default RequireAuth;
