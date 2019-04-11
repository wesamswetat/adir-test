export interface ITodoItem {
    id: string;
    name: string;
    status: "active" | "deactivate";
    date: Date;
}