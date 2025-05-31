// mock/modules/article.ts
import { MockMethod } from 'vite-plugin-mock';
import { createSuccessResponse, createPageData, createRandomData, createMockApi } from '../utils';


const articleApis: MockMethod[] = [
    // 文章列表
    {
        url: '/api/article/list',
        method: 'get',
        response: ({ query }: { query: Record<string, any> }) => {
            const page = Number(query.page) || 1;
            const pageSize = Number(query.pageSize) || 10;

            const template = {
                id: '@id',
                title: '@ctitle(10, 20)',
                content: '@cparagraph(1, 3)',
                author: '@cname',
                createTime: '@datetime',
                'tags|1-3': ['@cword(2,4)'],
                'status|1': ['draft', 'published']
            };

            const list = createRandomData(template, 100);
            return createPageData(list, page, pageSize);
        },
    },
    {
        url: '/api/article/detail/:id',
        method: 'get',
        response: ({ query }: { query: Record<string, any> }) => {
            console.log('请求参数query', query)
            return {
                code: 200,
                data: {
                    id: query.id,
                    title: '@ctitle(10, 20)',
                    content: '@cparagraph(5, 10)',
                    author: '@cname',
                    createTime: '@datetime',
                    'tags|1-3': ['@cword(2,4)'],
                    'status|1': ['draft', 'published'],
                    views: '@integer(100, 10000)',
                    likes: '@integer(10, 1000)'
                },
                message: 'success'
              };
        },
    },
];

export default articleApis;