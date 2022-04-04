///<reference types="react" />

// bootstrap mount

declare module "auth/AuthApp";
declare module 'dashboard/DashboardApp';

declare module 'header/HeaderApp';

declare module "common/CommonBootstrap" {
    const CommonBootstrap: React.ComponentType;
    export default CommonBootstrap;
}

declare module "common/NotificatioComponent" {
    const NotificatioComponent: React.ComponentType<{ notification: { title: string, description: string, color: string } }>;
    export default NotificatioComponent;
}
