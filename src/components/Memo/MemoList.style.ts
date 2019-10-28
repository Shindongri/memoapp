import styled from 'styled-components'

export const Container = styled.div`
    width: 310px;
    height: 100%;
    margin: 20px 5px 5px 5px;
`

export const LabelContainer = styled.div`
    width: 100%;
    height: 40px;
    background-color: #FFFFFF;
    border: solid 1px #cdcdcd;
    margin-bottom: 2px;
    padding: 8px;
    display: flex;
    justify-content: space-between;
`

export const Input = styled.input`
    border: 0;
`

export const List = styled.ul`
    margin: 0;
    list-style: none;
    padding-inline-start: 0;
    max-height: 768px;
    overflow: auto;
`

export const ListItem = styled.li`
    cursor: pointer;
    overflow: hidden;
    background-color: #FFFFFF;
    height: 83px;
    border: solid 1px #cdcdcd;
    display: flex;
    align-items: center;
    padding: 8px;
    margin-bottom: 2px;
    &:last-child {
        margin-bottom: 0;
    }
    &:hover {
        background-color: #e8e8e8;
    }
`

export const LeftContent = styled.div`
    align-self: stretch;
    display: flex;
    align-items: center;
    width: 15%;
`

export const ContentWrapper = styled.div``

export const RightContent = styled.div`
    align-self: stretch;
    display: flex;
    width: 85%;
    overflow: hidden;
    justify-content: space-between;
`

export const Title = styled.h3``

export const Description = styled.p``

export const UpdateDate = styled.small`
    align-self: stretch;
    display: flex;
    align-items: center;
    white-space: nowrap;
`
