declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '*.jpg'
declare module '*.jpeg'
declare module '*.png'
declare module '*.scss'

declare module "blueimp-md5"