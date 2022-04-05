import NotificationComponent from "./notification/components/notification.component";
import { INotification } from "./notification/core/interfaces/notification.interface";


const notification: INotification = {
    title: 'Sandbox notification testing',
    description: 'First notification message !',
    color: 'red',
    time: 5000
}

const SandBoxComponent = () => {
    return <div>
        <NotificationComponent notification={notification} />
    </div>
}

export default SandBoxComponent;