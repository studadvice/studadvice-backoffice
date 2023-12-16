import {Injectable} from '@angular/core';
import {Category, Document, Process} from "../../core/data/demarche";
import {Observable, of} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";


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

    addCategory(category: Category): Observable<Category> {
        const formData = this.buildCategoryFormData(category);
        return this.httpClient.post<Category>(environment.apiUrl + '/categories', formData);
    }

    private buildCategoryFormData(category: Category) {
        const formData: FormData = new FormData();
        if (category.image)
            formData.append('imageFile', category.image, category.image.name);

        const documentJson = JSON.stringify({
            name: category.name,
            description: category.description,
            image: category.image,
            process: category.process
        });
        formData.append('category', new Blob([documentJson], {
            type: 'application/json'
        }));

        return formData;
    }

    addProcess(process: Process): Observable<Process> {
        console.log("process", process);
        const formData = this.buildProcessFormData(process);
        return this.httpClient.post<Process>(environment.apiUrl + '/administrative-process', formData);
    }

    private buildProcessFormData(process: Process) {
        const formData: FormData = new FormData();
        if (process.image != null){
            formData.append('imageFile', process.image, process.image.name);
        }

        const processJson = JSON.stringify({
            name: process.name,
            description: process.description,
            minAge: process.minAge,
            maxAge: process.maxAge,
            image: process.image,
            nationalities: process.nationalities,
            universities: process.universities,
            steps: process.steps
        });
        formData.append('administrativeProcess', new Blob([processJson], {
            type: 'application/json'
        }));
        return formData;
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
        const formData = this.buildProcessFormData(value);
        return this.httpClient.put<Process>(environment.apiUrl + '/administrative-process/' + id, formData);
    }

    addDocument(document: any): Observable<Document> {
        const formData: FormData = this.createFormDocument(document);
        return this.httpClient.post<Document>(environment.apiUrl + '/required-document', formData);
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
        const formData: FormData = this.createFormDocument(value);
        return this.httpClient.put<Document>(environment.apiUrl + '/required-document/' + id, formData);
    }

    deleteDocument(id: string): Observable<Document> {
        return this.httpClient.delete<Document>(environment.apiUrl + '/required-document/' + id);
    }

    loadCountries(): Observable<any> {
        return this.httpClient.get(this.countryUrl);
    }

    getUniversities(limit: number, offset: number): Observable<any> {
        const requestOptions = {
            headers: new HttpHeaders({
                'Skip-Interceptor': 'true' // this is to skip the interceptor
            })
        };
        return this.httpClient.get(`${environment.universityUrl}?limit=${limit}&offset=${offset}` , requestOptions);
    }

    updateCategory(id: string, value: any): Observable<Category> {
        const formData = this.buildCategoryFormData(value);
        return this.httpClient.put<Category>(environment.apiUrl + '/categories/' + id, formData);
    }

    private createFormDocument(document: Document) {
        const formData: FormData = new FormData();
        if (document.image)
            formData.append('imageFile', document.image, document.image.name);

        const documentJson = JSON.stringify({
            name: document.name,
            description: document.description,
            image: document.image,
            url: document.url
        });
        formData.append('requiredDocument', new Blob([documentJson], {
            type: 'application/json'
        }));
        return formData;

    }
}
