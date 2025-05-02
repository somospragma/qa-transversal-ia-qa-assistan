import { lazy } from 'react';
import { IRouterList, IRouter } from './interface';

const LazyPublicHome = lazy(() => import('submodules/public/pages/home/home.page'));
const LazyPublicAssistant = lazy(() => import('submodules/public/pages/assistant/assistant.page'));

const createRoute = (
  to: string, 
  path: string, 
  Component: React.LazyExoticComponent<React.ComponentType<any>>, 
  isPrivate: boolean, 
  name?: string, 
  classIcon?: string
): IRouter => ({
  enabled: true,
  to,
  path,
  Component,
  isPrivate,
  name,
  classIcon,
});

export const routerList: IRouterList = {
  public: [
    createRoute('/', '', LazyPublicHome, false),
  ],
  private: [
    createRoute('/assistant', 'assistant', LazyPublicAssistant,true)
  ],
  shared: []
};
