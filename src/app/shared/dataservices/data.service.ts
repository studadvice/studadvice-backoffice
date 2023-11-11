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

  constructor() {
  }

  getCategories(): Observable<Category[]> {
    return of(this.data.categories);
  }

  addCategory(category: Category): Observable<Category> {
    this.data.categories.push(category);
    return of(category);
  }

  addProcedure(categoryName: string, subCategoryName: string, procedure: Procedure): void {
    const category = this.data.categories.find(c => c.name === categoryName);
    const subCategory = category?.subCategories.find(sc => sc.name === subCategoryName);
    if (subCategory) {
      subCategory.procedures.push(procedure);
    }
  }

}
