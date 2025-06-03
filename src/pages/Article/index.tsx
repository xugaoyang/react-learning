import { useNavigate } from "react-router-dom"
import { getArticleListApi } from '@/apis/mock/articles'
import { useEffect, useState } from 'react'
import { ArticleItem } from '@/types/article'
import { Table, Button, Space } from 'antd'

interface ArticleList {
  list: ArticleItem[],
  page: number,
  pageSize: number,
  total: number,
  totalPage: number
}

function Article() {
  const navigate = useNavigate()
  const [list, setList] = useState<ArticleItem[]>([])
  const columns = [
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
    },
    {
      title: '更新时间',
      dataIndex: 'createTime',
      key: 'createTime',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: unknown, record: ArticleItem) => (
        <Space size="middle">
          <Button type="primary" onClick={() => jumpToDetail(record.id)}>详情</Button>
          <Button type="primary" danger onClick={() => jumpToDetail(record.id)}>删除</Button>
        </Space>
      ),
    }
  ]
  const getListFn = async () => {
    const res = await getArticleListApi();
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
      <Table dataSource={list} columns={columns} />;
    </>
  )
}

export default Article
