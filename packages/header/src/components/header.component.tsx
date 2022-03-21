import { Fragment } from "react";
import NavbarComponent from "./navbar.component";

const HeaderComponent: React.FC<{ navigateTo: (routeTo: string) => void, profileMenuClickHandler:(menuItem:string)=>void } > = (props) => {
    return <Fragment>
        <NavbarComponent navigateTo={props.navigateTo} prfileMenuClickHandler={props.profileMenuClickHandler} name="Wide UI"/>
    </Fragment>
}


export default HeaderComponent; 