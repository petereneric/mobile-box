import {CookieList} from "./cookieList";

export interface CookieCategory {
  id: number
  cName: string
  cText: string
  bActive: boolean
  lCookieList: CookieList[]
}
