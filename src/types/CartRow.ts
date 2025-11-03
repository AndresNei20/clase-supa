import type { Product } from "./Product";

export interface CartRow {
    id: string;      
    quantity: number;
    product: Product; 
}