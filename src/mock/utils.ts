// mock/utils.ts
import { MockMethod } from 'vite-plugin-mock';
import Mock from 'mockjs';

// 生成分页数据
export function createPageData<T>(list: T[], page: number, pageSize: number) {
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const pageList = list.slice(start, end);
  
  return {
    code: 200,
    data: {
      list: pageList,
      total: list.length,
      page,
      pageSize
    },
    message: 'success'
  };
}

// 生成随机数据
export function createRandomData<T>(template: T, count: number) {
  return Mock.mock({
    [`list|${count}`]: [template]
  }).list;
}

// 生成成功响应
export function createSuccessResponse<T>(data: T) {
  return {
    code: 200,
    data,
    message: 'success'
  };
}

// 生成错误响应
export function createErrorResponse(message: string) {
  return {
    code: 500,
    data: null,
    message
  };
}

// 创建 mock 接口
export function createMockApi(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  response: any
): MockMethod {
  return {
    url,
    method,
    response: (options) => {
        console.log('11111111111', options.query?.id)
      return response;
    },
  };
}