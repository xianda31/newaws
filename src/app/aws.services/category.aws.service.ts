import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIService, Category } from '../API.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private _categories: Category[] = [];
  _categories$: BehaviorSubject<Category[]> = new BehaviorSubject<Category[]>(this._categories);

  constructor(
    private api: APIService,
  ) {

    // READ ALL CATEGORIES

    this.api.ListCategories().then((result) => {
      this._categories = result.items as Category[];
      console.log('this._categories : ', this._categories);
      this._categories$.next(this._categories);

    });

  }

  get categories$(): Observable<Category[]> {
    return this._categories$ as Observable<Category[]>;
  }

  // C(R)UD CATEGORIES


  createCategory(category: Category) {

    this.api.CreateCategory(category).then((result) => {
      const category = result as Category;
      this._categories.push(category);
      this._categories$.next(this._categories);
    })
      .catch((error) => { console.log('Error creating category: ', error); });
  }

  getCategoryById(id: string): Category | undefined {
    let category = this._categories.find((category) => category.id === id);
    console.log('category : ', category)
    return this._categories.find((category) => category.id === id);
  }

  updateCategory(category: Category) {
    this.api.UpdateCategory(category).then((result) => {
      this._categories = this._categories.map((cat) => cat.id === category.id ? category : cat);
      this._categories$.next(this._categories);
    })
      .catch((error) => { console.log('Error updating category: ', error); });

  }


  deleteCategory(category: Category) {
    this.api.DeleteCategory({ id: category.id }).then((result) => {
      this._categories = this._categories.filter((cat) => cat.id !== category.id);
      this._categories$.next(this._categories);
    })
      .catch((error) => {
        console.log('Error deleting category: ', error);
      });
  }
}
