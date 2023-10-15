import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { APIService, Article, Category } from '../API.service';

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
      // console.log('%s categories identifiées : ', this._categories.length);
      this._categories$.next(this._categories);

    })
      .catch((error) => { console.log('init categories failed !!', error) });

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

  // async agetCategory(id: string): Promise<any> {
  //   return this.api.GetCategory(id);
  // }
  // sgetCategory(id: string): Category {
  //   return this._categories.find((category) => category.id === id)!;
  // }


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


  // utilities

  async articlesByCategoryId(categoryId: string): Promise<Article[]> {
    let result = await this.api.ArticlesByCategoryId(categoryId);
    // console.log('articlesByCategoryId : ', result);
    return result.items as Article[];
  }

  getCategoryByLabel(label: string): Category {
    return this._categories.find((category) => category.label === label)!;
  }
}

