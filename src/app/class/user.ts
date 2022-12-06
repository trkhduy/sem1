import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})

export class User {
    id?: number;
    name?: any;
    email?: any;
    password?: any;
}
