import { ReactNode, LazyExoticComponent, JSX, ComponentType } from 'react';
import {LazyRouteFunction, RouteObject} from 'react-router-dom';
export interface IProtected {
    children: ReactNode | ReactNode[];
    isAuthenticated: boolean;
    type: 'private' | 'public';
}

export type JSXComponent= () => JSX.Element;
export interface IRouterList {
    public: IRouter[];
    private: IRouter[];
    shared: IRouter[];
}


export interface IRouter{
    to: string;
    path:string;
    className?:string;
    classIcon?: string;
    classLink?:string;
    icon?:string;
    lazy?: LazyRouteFunction<RouteObject>;
    Component: LazyExoticComponent<ComponentType<any>>;
    name?:string;
    isPrivate: boolean;
    enabled: boolean;
}