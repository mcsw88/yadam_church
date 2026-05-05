import type { RouteId } from './route';

export type MenuId = RouteId;

export interface SubMenu {
  id: string;
  labelKo: string;
}

export interface MenuItem {
  id: MenuId;
  labelKo: string;
  labelEn: string;
  sub: SubMenu[];
}
