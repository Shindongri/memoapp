import axios from 'axios'
import qs from 'querystring'
import { ILabel, IParam } from '../components/Label/Label.spec'

/* 라벨 목록 API */
export const fetchLabelAPI = () => axios.get('http://localhost:3000/labels')

/* 라벨 상세 API */
export const detailLabelAPI = (_id: string) => axios.get(`http://localhost:3000/labels/${ _id }`)

/* 라벨 생성 API */
export const createLabelAPI = ({ title, content }: ILabel) => axios.post('http://localhost:3000/labels', { title, content })

/* 라벨 갱신 API */
export const updateLabelAPI = ({ _id, title, content }: ILabel) => axios.put(`http://localhost:3000/labels/${ _id }`, { title, content })

/* 라벨 삭제 API */
export const removeLabelAPI = (_id: string) => axios.delete(`http://localhost:3000/labels/${ _id }`)

/* 메모 추가 API */
export const addMemosAPI = ({ _id, memoIds }: IParam) => axios.post(`http://localhost:3000/labels/${ _id }/memos`, { memoIds })

/* 메모 삭제 API */
export const removeMemosAPI = ({ _id, memoIds }: IParam) => axios.delete(`http://localhost:3000/labels/${ _id }/memos?memoIds=${ [ memoIds ] }`)
