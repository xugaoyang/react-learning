import { useNavigate } from "react-router-dom"
import { getArticleListApi } from '@/apis/mock/articles'
import { useEffect, useState } from 'react'
function Article() {
  const navigate = useNavigate()
  const [list, setList] = useState([])
  const getListFn = async () => {
    const res = await getArticleListApi();
    console.log(res)
    setList(res.data.list)
  };
  useEffect(() => {
    getListFn()
  }, [])
  const jumpToDetail = (id:string) => {
    navigate(`/articleDetail/${id}`)
  }
  return (
    <>
      <ul>
        {list.map((item) => (
          <li key={item.id} onClick={() => jumpToDetail(item.id)} className="cursor-pointer text-black hover:text-red-600">{item.content}</li>
        ))}
      </ul>
    </>
  )
}

export default Article
