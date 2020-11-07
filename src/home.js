import React, { useContext } from "react";
import ProfilePage from "./profilepage";
import SignIn from "./signIn";
import { UserContext } from "./providers/UserProvider";

export default function Home() {
    const user = useContext(UserContext);

    return (
        user ?
            <ProfilePage/>
            :
            <SignIn/>

    );
}