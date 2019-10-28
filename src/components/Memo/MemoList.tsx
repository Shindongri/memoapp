import React, { useState, useCallback, memo } from 'react'
import { Button, Popconfirm, Checkbox, Result } from 'antd'
import { format, isValid } from 'date-fns'

import { Container, LabelContainer, Input, List, ListItem, LeftContent, RightContent, ContentWrapper, Title, Description, UpdateDate } from './MemoList.style'
import { IMemo, IListProps } from './Memo.spec'

const MemoList = memo(({ _id, items, label, onSetting, onUnSetting, onCheck, onRemove, onUpdate, onSelect }: IListProps) => {
    const [editable, setEditable] = useState(false)
    const [title, setTitle] = useState(label)

    const toggleEditable = useCallback(() => setEditable(!editable), [])

    const handleInput = useCallback((v: string) => setTitle(v), [])

    const handleUpdate = (e: any) => {
        if (e.key === 'Enter') {
            onUpdate({ _id, title, content: '' })
        }
    }

    return (
        <Container>
            <LabelContainer>
                {
                    editable ?
                        (
                            <Input type="text" value={ title } placeholder="라벨명을 입력해주세요." onChange={ (e: any) => handleInput(e.target.value) } onBlur={ toggleEditable } onKeyDown={ handleUpdate } />
                        ) :
                        (
                            <h3 onClick={ toggleEditable }>{ label }</h3>
                        )
                }
                <Button.Group>
                    <Button type="link" size="small" onClick={ () => onSetting(_id) }>설정</Button>
                    <Button type="link" size="small" onClick={ () => onUnSetting(_id)}>설정해제</Button>
                    <Popconfirm title={ '라벨을 삭제하시겠습니까?' } onConfirm={ () => onRemove(_id) }>
                        <Button size="small" icon="delete">삭제</Button>
                    </Popconfirm>
                </Button.Group>
            </LabelContainer>
            {
                items && items.length > 0 ? (
                    <List>
                        {
                            items.map(({ _id, title, content, updatedAt }: IMemo) => (
                                <ListItem key={ _id }>
                                    <LeftContent>
                                        <Checkbox onClick={ (e: any) => onCheck({ id: _id, checked: e.target.checked }) } />
                                    </LeftContent>
                                    <RightContent onClick={ () => onSelect(_id) }>
                                        <ContentWrapper>
                                            <Title>{ title }</Title>
                                            <Description>{ content }</Description>
                                        </ContentWrapper>
                                        <UpdateDate>{ isValid(new Date(updatedAt)) ? format(new Date(updatedAt), 'yyyy-mm-dd') : '' }</UpdateDate>
                                    </RightContent>
                                </ListItem>
                            ))
                        }
                    </List>
                ) : (
                    <Result
                        status="warning"
                        title="메모가 존재하지 않습니다."
                        style={{
                            backgroundColor: '#FFFFFF',
                            border: 'solid 1px #cdcdcd',
                            whiteSpace: 'nowrap'
                        }}
                    />
                )
            }
        </Container>
    )
})

export default MemoList
