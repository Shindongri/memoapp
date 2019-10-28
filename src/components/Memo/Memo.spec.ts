export interface IMemo {
    _id: string;
    createdAt?: string;
    updatedAt: string;
    title: string;
    content: string;
}

export interface IListProps {
    _id: string;
    items: IMemo[];
    label: string;

    onSetting(id: string): void;
    onUnSetting(id: string): void;
    onSelect(id: string): void;
    onRemove(id: string): void;
    onCheck({ id, checked }: any): void;
    onUpdate({ title, content }: any): void;
}

export interface IViewProps extends IMemo {
    // visible: boolean;
    onUpdate({ title, content }: any): void
    onRemove(_id: string): void;
}
