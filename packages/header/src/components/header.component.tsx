import { Fragment } from "react";
import NavbarComponent from "./navbar.component";

const HeaderComponent: React.FC<{ navigateTo: (routeTo: string) => void, profileMenuClickHandler: (menuItem: string) => void, isAuthenticated: boolean }> = (props) => {
    return <Fragment>
        <NavbarComponent navigateTo={props.navigateTo} profileMenuClickHandler={props.profileMenuClickHandler} isAuthenticated={props.isAuthenticated} />
    </Fragment>
}


export default HeaderComponent; 