import axios from 'axios'
import { IMemo } from '../components/Memo/Memo.spec'

/* 메모 목록 API */
export const fetchMemoAPI = () => axios.get('http://localhost:3000/memos')

/* 메모 상세 API */
export const detailMemoAPI = (_id: string) => axios.get(`http://localhost:3000/memos/${ _id }`)

/* 메모 생성 API */
export const createMemoAPI = ({ title, content }: IMemo) => axios.post('http://localhost:3000/memos', { title, content })

/* 메모 갱신 API */
export const updateMemoAPI = ({ _id, title, content }: IMemo) => axios.put(`http://localhost:3000/memos/${ _id }`, { title, content })

/* 메모 삭제 API */
export const removeMemoAPI = (_id: string) => axios.delete(`http://localhost:3000/memos/${ _id }`)
