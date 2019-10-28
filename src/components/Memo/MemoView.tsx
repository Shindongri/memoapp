import React, { useState, useCallback, memo, Fragment } from 'react'
import { Button, Popconfirm } from 'antd'
import { format, isValid } from 'date-fns'

import { Container, Header, Input, DateWrapper, UpdateDate, Textarea } from './MemoView.style'
import { IViewProps } from './Memo.spec'

const MemoView = memo(({ _id, updatedAt, title, content, onRemove, onUpdate }: IViewProps) => {
    const [editableTitle, setEditableTitle] = useState(false)
    const [editableContent, setEditableContent] = useState(false)
    const [_title, setTitle] = useState(() => title)
    const [_content, setContent] = useState(content)

    const toggleEditableTitle = useCallback(() => setEditableTitle(!editableTitle), [])
    const toggleEditableContent = useCallback(() => setEditableContent(!editableContent), [])

    const inputTitle = useCallback((v: string) => setTitle(v), [])
    const inputContent = useCallback((v: string) => setContent(v), [])

    return (
        <Container>
            <Fragment>
                <Header>
                    {
                        editableTitle ?
                            ( <Input value={ _title } onChange={ (e: any) => inputTitle(e.target.value)} onFocus={ toggleEditableTitle } /> ) :
                            ( <h3 onClick={ toggleEditableTitle }>{ title }</h3> )
                    }
                    <Button.Group>
                        <Button icon="save" size="small" onClick={ () => onUpdate({ _id, title: _title, content: _content }) }>저장</Button>
                        <Popconfirm title={ '메모를 삭제하시겠습니까?' } onConfirm={ () => onRemove(_id) }>
                            <Button icon="delete" size="small">삭제</Button>
                        </Popconfirm>
                    </Button.Group>
                </Header>
                <DateWrapper>
                    <UpdateDate>{ isValid(new Date(updatedAt)) ? format(new Date(updatedAt), 'yyyy-mm-dd') : '' }</UpdateDate>
                </DateWrapper>
                <Textarea readOnly={ !editableContent } defaultValue={ content } value={ _content } onChange={ (e: any) => inputContent(e.target.value) } onFocus={ toggleEditableContent } />
            </Fragment>
        </Container>
    )
})

export default MemoView
