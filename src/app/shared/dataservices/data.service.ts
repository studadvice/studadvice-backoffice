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
        // generate random id
        category.id = Math.random().toString(36).substr(2, 9);
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

    updateProcedure(id: string, value: any) : Observable<Procedure> {
        const procedure = this.proceduresData.procedures.find((procedure) => procedure.id === id);
        if (procedure) {
            Object.assign(procedure, value);
        }
        if (procedure) {
            return of(procedure);
        }
        return of({} as Procedure);
    }
}
