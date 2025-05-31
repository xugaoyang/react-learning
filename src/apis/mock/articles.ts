import { request } from '@/utils'

const getArticleListApi = async () => {
    return await request.get('/api/article/list')
}

const getArticleDetailApi = async (id: string | number) => {
    return await request.get(`/api/article/detail/${id}`)
}

export { getArticleListApi, getArticleDetailApi }