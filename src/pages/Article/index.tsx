import { useNavigate } from "react-router-dom"

function Article() {
  const navigate = useNavigate()
  const list = [
    {
      id: 1,
      name: '科学论文',
    },
    {
      id: 2,
      name: '体坛周报',
    },
    {
      id: 3,
      name: '军事力量',
    },
    {
      id: 4,
      name: '商海浮沉',
    },
  ]
  const jumpToDetail = (id) => {
    navigate(`/articleDetail/${id}`)
  }
  return (
    <>
      <ul>
        {list.map((item) => (
          <li key={item.id} onClick={() => jumpToDetail(item.id)} className="cursor-pointer text-black hover:text-red-600">{item.name}</li>
        ))}
      </ul>
    </>
  )
}

export default Article
