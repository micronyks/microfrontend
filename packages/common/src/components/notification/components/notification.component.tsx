import React, { Fragment, useEffect, useState } from "react";

// custom imports
import { INotification } from "../core/interfaces/notification.interface"


const NotificationComponent: React.FC<{ notification: INotification }> = (props) => {

    const [show, setShow] = useState<boolean>(true);

    if (show && props.notification.time && props.notification.time > 0) {
        setTimeout(() => {
            setShow(false);
        }, props.notification.time);
    }

    const element = (show && <div>
        <h1> {props.notification.title} </h1>
        <h3> {props.notification.description}</h3>
    </div>);

    return <Fragment>{element}</Fragment>
}

export default NotificationComponent;   