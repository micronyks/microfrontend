import NotificationComponent from "./notification/components/notification.component";
import {INotification} from "./notification/core/interfaces/notification.interface";


const notification:INotification={
    title:'first notification',
    description:'My First ever notification created !',
    color:'red',
    time:1000
}

const SandBoxComponent=()=>{
    return <div>
        <NotificationComponent notification={notification} />
    </div>
}

export default SandBoxComponent;