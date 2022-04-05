import { Card, CardContent, Typography } from "@mui/material";
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
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {props.notification.title}
                </Typography>
                <Typography variant="body2">
                    {props.notification.description}
                </Typography>
            </CardContent>
        </Card>
    </div>);

    return <Fragment>{element}</Fragment>
}

export default NotificationComponent;   