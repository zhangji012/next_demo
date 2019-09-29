declare module '*.png'
declare module '*.gif'
declare module '*.jpg'
declare module '*.jpeg'
declare module '*.svg'
declare module '*.css'
declare module '*.scss'

declare var wx: any

declare var __wxConfig: any
declare var App: any

/**
 * 全局状态
 */
interface IStore {

  home: IHomeStore

}

interface IHomeStore {
  count: number
}


/**
 * dva异步方法调用
 */
type IDispatch = (object: { type: string; payload?: object; callback?: (res: any) => void }) => any

interface IEffectsAction {
  //参数
  payload?: any
  //回调
  callback?: (res?: any | boolean) => void
}
