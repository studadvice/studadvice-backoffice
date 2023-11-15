import {Injectable} from '@angular/core';
import {Category, Procedure, Document} from "../../core/data/demarche";
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

    private documentsData = {
        documents: [] as Document[],
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

    getProcedures(page: number, itemsPerPage: number): Observable<{ procedures: Procedure[], total: number }> {
        // Calculate starting index of the items on the current page
        const startIndex = (page - 1) * itemsPerPage;
        // Slice the procedures array to get only the items for the current page
        const end = startIndex + itemsPerPage;
        const proceduresPage = this.proceduresData.procedures.slice(startIndex, end);
        // Return an observable containing the procedures for the current page and the total count
        return of({
            procedures: proceduresPage,
            total: this.proceduresData.procedures.length
        });
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

    addDocument(value: any) : Observable<Document> {
        const document = {
            id: Math.random().toString(36).substr(2, 9),
            name: value.name,
            description: value.description,
            link: value.link
        };
        this.documentsData.documents.push(document);
        return of(document);

    }

    getDocuments(): Observable<Document[]> {
        return of(this.documentsData.documents);
    }
}
