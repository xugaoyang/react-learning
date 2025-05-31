import { MockMethod } from 'vite-plugin-mock';
import userApis from './modules/user';
import articleApis from './modules/article';


export default [
    ...userApis,
    ...articleApis,
] as MockMethod[];