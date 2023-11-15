import {Injectable} from '@angular/core';
import {Category, Procedure, Document} from "../../core/data/demarche";
import {Observable, of} from "rxjs";


@Injectable({
    providedIn: 'root'
})
export class DataService {
    private data = {
        categories: [
            {
                id: '1',
                name: 'Category 1',
                description: 'Category 1 description',
                image: 'assets/images/category-1.jpg',
                procedures: []
            },
            {
                id: '2',
                name: 'Category 2',
                description: 'Category 2 description',
                image: 'assets/images/category-2.jpg',
                procedures: []
            },
            {
                id: '3',
                name: 'Category 3',
                description: 'Category 3 description',
                image: 'assets/images/category-3.jpg',
                procedures: []
            },
            {
                id: '4',
                name: 'Category 4',
                description: 'Category 4 description',
                image: 'assets/images/category-4.jpg',
                procedures: []
            },
            {
                id: '5',
                name: 'Category 5',
                description: 'Category 5 description',
                image: 'assets/images/category-5.jpg',
                procedures: []
            },
            {
                id: '6',
                name: 'Category 6',
                description: 'Category 6 description',
                image: 'assets/images/category-6.jpg',
                procedures: []
            },
            {
                id: '7',
                name: 'Category 7',
                description: 'Category 7 description',
                image: 'assets/images/category-7.jpg',
                procedures: []
            },
            {
                id: '8',
                name: 'Category 8',
                description: 'Category 8 description',
                image: 'assets/images/category-8.jpg',
                procedures: []
            }
        ] as Category[],
    }

    private proceduresData = {
        procedures: [
            {
                id: '1',
                name: 'Procedure 1',
                description: 'Procedure 1 description',
                steps: []
            },
            {
                id: '2',
                name: 'Procedure 2',
                description: 'Procedure 1 description',
                steps: []
            },
            {
                id: '3',
                name: 'Procedure 3',
                description: 'Procedure 1 description',
                steps: []
            },
            {
                id: '4',
                name: 'Procedure 4',
                description: 'Procedure 1 description',
                steps: []
            },
            {
                id: '5',
                name: 'Procedure 5',
                description: 'Procedure 1 description',
                steps: []
            },
            {
                id: '6',
                name: 'Procedure 6',
                description: 'Procedure 1 description',
                steps: []
            },
            {
                id: '7',
                name: 'Procedure 7',
                description: 'Procedure 1 description',
                steps: []
            },
            {
                id: '8',
                name: 'Procedure 8',
                description: 'Procedure 1 description',
                steps: []
            }
        ] as Procedure[],
    }

    private documentsData = {
        documents: [] as Document[],
    }

    constructor() {
    }

    getCategories(page: number, itemsPerPage: number): Observable<{ categories: Category[], total: number }> {
        // Calculate starting index of the items on the current page
        const startIndex = (page - 1) * itemsPerPage;
        // Slice the categories array to get only the items for the current page
        const end = startIndex + itemsPerPage;
        const categoriesPage = this.data.categories.slice(startIndex, end);
        // Return an observable containing the categories for the current page and the total count
        return of({
            categories: categoriesPage,
            total: this.data.categories.length
        });
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

    deleteProcedure(id: string): Observable<Procedure> {
        const procedure = this.proceduresData.procedures.find((procedure) => procedure.id === id);
        if (procedure) {
            this.proceduresData.procedures.splice(this.proceduresData.procedures.indexOf(procedure), 1);
        }
        if (procedure) {
            return of(procedure);
        }
        return of({} as Procedure);
    }

    deleteCategory(id: string) {
        const category = this.data.categories.find((category) => category.id === id);
        if (category) {
            this.data.categories.splice(this.data.categories.indexOf(category), 1);
        }
        if (category) {
            return of(category);
        }
        return of({} as Category);
    }
}
