import { IMemo } from '../Memo/Memo.spec'

export interface ILabel {
    _id: string;
    updatedAt: string;
    createdAt?: string;
    title: string;
    content: string;
    memos: IMemo[];
}

export interface IProps {
    totalCount: number;
    items: ILabel[];
    onInsert(value: any): void;
    onSelect(_id: string | null): void;
}

export interface IParam {
    _id: string;
    memoIds: string[];
}
