import { Fragment } from "react";
import NavbarComponent from "./navbar.component";

const reactImage = require("../images/logo192.png");

const HeaderComponent: React.FC<{ navigateTo: (routeTo: string) => void, profileMenuClickHandler: (menuItem: string) => void, isAuthenticated: boolean }> = (props) => {
    return <Fragment>
        <NavbarComponent navigateTo={props.navigateTo} profileMenuClickHandler={props.profileMenuClickHandler} isAuthenticated={props.isAuthenticated} />

        <h1>Testing Header Image</h1>
        <img src={reactImage}></img>
    </Fragment>
}


export default HeaderComponent; 