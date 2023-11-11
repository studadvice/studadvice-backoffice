import {Injectable} from '@angular/core';
import {Category, Procedure} from "../../core/data/demarche";
import {Observable, of} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class DataService {
    private data = {
        categories: [] as Category[],
    }

    private proceduresData = {
        procedures: [] as Procedure[],
    }

    constructor() {
    }

    getCategories(): Observable<Category[]> {
        return of(this.data.categories);
    }

    addCategory(category: Category, procedures?: Procedure[]): Observable<Category> {
        this.data.categories.push(category);
        return of(category);
    }

    addProcedure(procedure: Procedure): Observable<Procedure> {
        this.proceduresData.procedures.push(procedure);
        return of(procedure);
    }

    getProcedures(): Observable<Procedure[]> {
        return of(this.proceduresData.procedures);
    }

}
