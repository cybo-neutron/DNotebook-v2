export type Note = {
    id:string
    title: string,
    description: string,
}

export type SidebarNoteProps = Note & {
    isActive: boolean;
    onSelectNote: (id: string) => void;
};
