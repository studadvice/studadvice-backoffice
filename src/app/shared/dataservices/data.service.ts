import {Injectable} from '@angular/core';
import {Category, Document, Process} from "../../core/data/demarche";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environments";


@Injectable({
    providedIn: 'root'
})
export class DataService {

    private countryUrl = environment.countryUrl;

    private documentsData = {
        documents: [] as Document[],
    }

    constructor(public httpClient: HttpClient) {
    }

    getCategories(page: number, itemsPerPage: number): Observable<any> {
        return this.httpClient.get<Category[]>(environment.apiUrl + '/categories',
            {
                params: {
                    page: page.toString(),
                    size: itemsPerPage.toString()
                }
            });
    }

    addCategory(category: Category, procedures?: Process[]): Observable<Category> {
        // generate random id
        return this.httpClient.post<Category>(environment.apiUrl + '/categories', category);
    }

    addProcess(procedure: Process): Observable<Process> {
        return this.httpClient.post<Process>(environment.apiUrl + '/administrative-process', procedure);
    }

    getProcess(page: number, itemsPerPage: number): Observable<any> {
        return this.httpClient.get<Process>(environment.apiUrl + '/administrative-process',
            {
                params: {
                    page: page.toString(),
                    size: itemsPerPage.toString()
                }
            });
    }

    getAllAdministrativeProcess(): Observable<Process[]> {
        return this.httpClient.get<Process[]>(environment.apiUrl + '/administrative-process');
    }

    updateProcess(id: string, value: any): Observable<Process> {
        return this.httpClient.put<Process>(environment.apiUrl + '/administrative-process/' + id, value);
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
                    size: itemsPerPage.toString()
                }
            });
    }

    getAllDocuments(): Observable<Document[]> {
        return this.httpClient.get<Document[]>(environment.apiUrl + '/required-document');
    }

    deleteProcess(id: string): Observable<Process> {
        return this.httpClient.delete<Process>(environment.apiUrl + '/administrative-process/' + id);
    }

    deleteCategory(id: string) {
        return this.httpClient.delete(environment.apiUrl + '/categories/' + id);
    }

    updateDocument(id: string, value: any): Observable<Document> {
        return this.httpClient.put<Document>(environment.apiUrl + '/required-document/' + id, value);
    }

    loadCountries(): Observable<any> {
        return this.httpClient.get(this.countryUrl);
    }

    getUniversities(country: string): Observable<any> {
        return this.httpClient.get(`${environment.universityUrl}${country}`);
    }
}
