// blue print struktur data pengeluaran
export interface Expense {
    id: string;
    title: string;
    amount: number;
    category: string;
    date: Date;
}

// database sementara
export const expense: Expense[] = [];