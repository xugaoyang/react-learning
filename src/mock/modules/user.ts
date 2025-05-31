// mock/modules/user.ts
import { MockMethod } from 'vite-plugin-mock';
import { createSuccessResponse, createMockApi } from '../utils';

const userApis: MockMethod[] = [
  // 用户信息
  createMockApi('/api/user/info', 'get', createSuccessResponse({
    id: '@id',
    name: '@cname',
    avatar: '@image("200x200")',
    email: '@email',
    phone: /^1[3-9]\d{9}$/,
    role: '@pick(["admin", "user"])',
    createTime: '@datetime'
  })),

  // 登录接口
  {
    url: '/api/user/login',
    method: 'post',
    response: ({ body }: { body: any }) => {
      const { username, password } = body;
      if (username === 'admin' && password === '123456') {
        return createSuccessResponse({
          token: '@guid',
          userInfo: {
            id: '@id',
            name: '@cname',
            avatar: '@image("200x200")'
          }
        });
      }
      return {
        code: 401,
        data: null,
        message: '用户名或密码错误'
      };
    },
  },
];

export default userApis;