import React, { useCallback, useEffect, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getOr } from 'lodash/fp'

import { Container } from './IndexContainer.style'
import { LabelActions, FETCH_LABEL_REQUEST } from '../../modules/label'
import { FETCH_MEMO_REQUEST } from '../../modules/memo'

import LabelList from '../../components/Label/LabelList'
import MemoList from '../../components/Memo/MemoList'

const IndexContainer: React.FC<{}> = memo(() => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch({ type: FETCH_LABEL_REQUEST })
        dispatch({ type: FETCH_MEMO_REQUEST })
    }, [])

    const labels: any = useSelector((state: any) => getOr([], 'label.labels')(state))
    const memos = useSelector((state: any) => getOr([], 'memo.memos')(state))

    const handleCreateLabel = useCallback(payload => dispatch(LabelActions.createLabel(payload)), [])
    const handleSelectLabel = useCallback((id: string) => history.push(`/label/${ id }`), [])
    // const handleSelectMemo = useCallback((id: string) => history.push(`/memo/${ labelId }/${ id }`), [])

    return (
        <Container>
            <LabelList
                totalCount={ memos.length }
                items={ labels }
                onInsert={ handleCreateLabel }
                onSelect={ handleSelectLabel }
            />
            {/*<MemoList*/}
            {/*    _id={ labels[0]._id }*/}
            {/*    items={ memos }*/}
            {/*    label={ labels[0].title }*/}
            {/*    onRemove={ () => {} }*/}
            {/*    onUpdate={ () => {} }*/}
            {/*    onSelect={ () => {} }*/}
            {/*/>*/}
        </Container>
    )
})

export default IndexContainer
