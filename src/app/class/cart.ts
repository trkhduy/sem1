import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class Cart {
    id?: number
    id_product?: number
    id_category?: number
    id_user?: number
    name_user?: any
    image?: any
    name?: any
    price?: any
    size?: any
    quantity?: any
    totalEachitem?: number
}
