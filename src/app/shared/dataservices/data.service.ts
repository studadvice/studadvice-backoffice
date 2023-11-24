import {Injectable} from '@angular/core';
import {Category, Document, Process} from "../../core/data/demarche";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environments";


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
                process: []
            },
            {
                id: '2',
                name: 'Category 2',
                description: 'Category 2 description',
                image: 'assets/images/category-2.jpg',
                process: []
            },
            {
                id: '3',
                name: 'Category 3',
                description: 'Category 3 description',
                image: 'assets/images/category-3.jpg',
                process: []
            },
            {
                id: '4',
                name: 'Category 4',
                description: 'Category 4 description',
                image: 'assets/images/category-4.jpg',
                process: []
            },
            {
                id: '5',
                name: 'Category 5',
                description: 'Category 5 description',
                image: 'assets/images/category-5.jpg',
                process: []
            },
            {
                id: '6',
                name: 'Category 6',
                description: 'Category 6 description',
                image: 'assets/images/category-6.jpg',
                process: []
            },
            {
                id: '7',
                name: 'Category 7',
                description: 'Category 7 description',
                image: 'assets/images/category-7.jpg',
                process: []
            },
            {
                id: '8',
                name: 'Category 8',
                description: 'Category 8 description',
                image: 'assets/images/category-8.jpg',
                process: []
            }
        ] as Category[],
    }

    private proceduresData = {
        process: [
            {
                id: '1',
                name: 'Process 1',
                description: 'Process 1 description',
                steps: []
            },
            {
                id: '2',
                name: 'Process 2',
                description: 'Process 1 description',
                steps: []
            },
            {
                id: '3',
                name: 'Process 3',
                description: 'Process 1 description',
                steps: []
            },
            {
                id: '4',
                name: 'Process 4',
                description: 'Process 1 description',
                steps: []
            },
            {
                id: '5',
                name: 'Process 5',
                description: 'Process 1 description',
                steps: []
            },
            {
                id: '6',
                name: 'Process 6',
                description: 'Process 1 description',
                steps: []
            },
            {
                id: '7',
                name: 'Process 7',
                description: 'Process 1 description',
                steps: []
            },
            {
                id: '8',
                name: 'Process 8',
                description: 'Process 1 description',
                steps: []
            }
        ] as Process[],
    }

    private documentsData = {
        documents: [] as Document[],
    }

    constructor(public httpClient: HttpClient) {
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

    addCategory(category: Category, procedures?: Process[]): Observable<Category> {
        // generate random id
        return this.httpClient.post<Category>(environment.apiUrl + '/categories', category);
    }

    addProcess(procedure: Process): Observable<Process> {
        return this.httpClient.post<Process>(environment.apiUrl + '/administrative-process', procedure);
    }

    getProcess(page: number, itemsPerPage: number): Observable<{ process: Process[], total: number }> {
        // Calculate starting index of the items on the current page
        const startIndex = (page - 1) * itemsPerPage;
        // Slice the process array to get only the items for the current page
        const end = startIndex + itemsPerPage;
        const proceduresPage = this.proceduresData.process.slice(startIndex, end);
        // Return an observable containing the process for the current page and the total count
        return of({
            process: proceduresPage,
            total: this.proceduresData.process.length
        });
    }

    updateProcess(id: string, value: any): Observable<Process> {
        const process = this.proceduresData.process.find((procedure) => procedure.id === id);
        if (process) {
            Object.assign(process, value);
        }
        if (process) {
            return of(process);
        }
        return of({} as Process);
    }

    addDocument(value: any): Observable<Document> {
        const document = {
            name: value.name,
            description: value.description,
            link: value.link
        };
        return this.httpClient.post<Document>(environment.apiUrl + '/required-document', document);
    }

    getDocuments(page: number, itemsPerPage: number): Observable<any> {
        return this.httpClient.get<Document[]>(environment.apiUrl + '/required-document',
            {
                params: {
                    page: page.toString(),
                    itemsPerPage: itemsPerPage.toString()
                }
            });
    }

    getAllDocuments(): Observable<Document[]> {
        return of(this.documentsData.documents);
    }

    deleteProcess(id: string): Observable<Process> {
        const procedure = this.proceduresData.process.find((procedure) => procedure.id === id);
        if (procedure) {
            this.proceduresData.process.splice(this.proceduresData.process.indexOf(procedure), 1);
        }
        if (procedure) {
            return of(procedure);
        }
        return of({} as Process);
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

    updateDocument(id: string, value: any): Observable<Document> {
        return this.httpClient.put<Document>(environment.apiUrl + '/required-document/' + id, value);
    }
}
