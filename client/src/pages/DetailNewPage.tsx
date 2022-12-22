import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import newsApi from 'src/apis/newsApi'

const DetailNewPage = () => {
  const user = JSON.parse(localStorage.getItem('USER') || {})
  const [isApprove, setIsApprove] = useState()
  const params = useParams()
  const navigate = useNavigate()
  const [html, setHtml] = useState<string>('')

  console.log('check: ', user)

  useEffect(() => {
    getDetailNews()
  }, [])

  const getDetailNews = async () => {
    try {
      const res = await newsApi.getById(Number(params.id))
      setIsApprove(res?.data?.data[0]?.is_approve)
      console.log(res?.data?.data[0]?.is_approve)
      setHtml(res?.data?.data[0]?.html)
    } catch (error) {
      console.log('err:', error)
    }
  }

  const handleApproveNew = async () => {
    try {
      const res = await newsApi.activeWaiting(Number(params.id))
      navigate(-1)
    } catch (error) {
      console.log('err:', error)
    }
  }

  const handleDeleteNew = async () => {
    try {
      const res = await newsApi.delete(Number(params.id))
      navigate(-1)
    } catch (error) {
      console.log('err:', error)
    }
  }
  return (
    <>
      <div className="renderHTML" style={{ padding: '16px 32px', display: 'flex', justifyContent: 'center' }}>
        <div className="doctor_specialty" dangerouslySetInnerHTML={html ? { __html: html } : undefined}></div>
      </div>
      {user?.role_id && user?.role_id === 'r1' && isApprove !== 1 ? (
        <div style={{ width: '100%' }}>
          <Button sx={{ width: 120 }} variant="contained" onClick={handleApproveNew}>
            Phê duyệt
          </Button>
          <Button sx={{ width: 120, marginLeft: 2 }} onClick={handleDeleteNew}>
            Xóa bỏ
          </Button>
        </div>
      ) : (
        ''
      )}
    </>
  )
}

export default DetailNewPage
