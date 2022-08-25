import React, { useState, useEffect } from 'react'
import { Space, Table, Button } from 'antd';
import { ArticleListApi } from '../request/api'

const MyTitle = (props) => (
  <>
    <a href={
      "http://codesohigh.com:8765/article/" + props.id
    } target="_blank">{props.title}</a>
    <p style={{ color: '#999' }}>{props.subTitle}</p>
  </>
)

export default function List() {

  const columns = [
    {
      dataIndex: 'mytitle',
      width: '60%',
      key: 'mytitlt',
      render: (el) => <>{el}</>
    },
    {
      dataIndex: 'date',
      key: 'date',
    },
    {
      key: 'action',
      render: () => (
        <Space size="middle">
          <Button type="primary" size>编辑</Button>
          <Button type="primary" danger size>删除</Button>
        </Space>
      ),
    },
  ]

  const [data, setData] = useState([])

  useEffect(() => {
    ArticleListApi().then(res => {
      if (res.errCode === 0) {
        let newArr = res.data.arr
        newArr = newArr.map(item => {
          return {
            key: item.id,
            date: item.date,
            mytitle: <MyTitle id={item.id} title={item.title} subTitle={item.subTitle} />
          }
        })
        setData(newArr)
      }
    })
  }, [])


  return (
    <div style={{
      width: '100%'
    }}>
      <Table showHeader={false} columns={columns} dataSource={data} />
    </div>
  )
}
