import { useParams } from "react-router-dom"

function ArticleDetail() {
  const params = useParams()
  return <div className="">我是文章{params.id}</div>
}

export default ArticleDetail