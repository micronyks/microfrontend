///<reference types="react" />

declare module "common/NotificationComponent" {
    const NotificationComponent: React.ComponentType<{ notification: { title: string, description: string, color: string, time: number } }>;
    export default NotificationComponent;
}
