import { useParams } from "react-router-dom"
import { getArticleDetailApi } from '@/apis/mock/articles'
import { useEffect, useState } from 'react'


interface Article {
  content: string;
  // ... existing code ...
}

function ArticleDetail() {
  const params = useParams()
  const [error, setError] = useState<string>('')
  const [article, setArticle] = useState<Article | null>(null)
  const getDetailFn = async (id: string | undefined) => {
    try {
      if (!id) {
        throw new Error('文章ID不能为空')
      }
      const res = await getArticleDetailApi(id)
      console.log('文章详情:', res.data)
      setArticle(res.data)
    } catch (err) {
      console.error('获取文章详情失败:', err)
      setError(err instanceof Error ? err.message : '获取文章详情失败')
    }
  }

  useEffect(() => {
    if (params.id) {
      getDetailFn(params.id)
    }
  }, [params.id])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return <div className="">{article?.content}</div>
}

export default ArticleDetail