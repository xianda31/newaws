import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article, Category } from 'src/app/API.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';
import { environment } from 'src/app/environments/environment';
import { ToastService } from 'src/app/tools/service/toast.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoryForm!: FormGroup;
  categories$: Observable<Category[]> = this.categoryService.categories$;
  articlesByCategoryId: Article[][] = [];
  createMode: boolean = true;
  selectedCategory!: Category;

  fileTooBig: boolean = false;
  maxSize: string = environment.max_category_image_size_text;


  // TO DO : controler la taille de l'image


  constructor(
    private categoryService: CategoryService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {

    this.categories$.subscribe((categories) => {
      categories.forEach(async (category, index) => {
        this.articlesByCategoryId[index] = await this.categoryService.articlesByCategoryId(category.id);
        // console.log('category', category.label, this.articlesByCategoryId[index].length);
      });
    });

    this.categoryForm = new FormGroup({
      label: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      // image: new FormControl('', Validators.required),
    });

  }

  get label() { return this.categoryForm.get('label')!; }
  get description() { return this.categoryForm.get('description')!; }

  selectCategory(category: Category) {
    this.categoryForm.patchValue(category);
    this.createMode = false;
    this.selectedCategory = category;
  }


  // CR(U)D CATEGORIES


  createCategory() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }
    this.categoryService.createCategory(this.categoryForm.value);
    this.categoryForm.reset();
  }

  updateCategory() {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }
    let newCategory = this.categoryForm.value;
    newCategory.id = this.selectedCategory.id;
    this.categoryService.updateCategory(newCategory);
    this.categoryForm.reset();
    this.createMode = true;
  }


  async deleteCategory(event: any, category: Category) {
    const articles = await this.categoryService.articlesByCategoryId(category.id);
    if (articles.length > 0) {
      this.toastService.showWarningToast('Category not empty', 'la rubrique n\'est pas vide');
      return
    } else {
      event.stopPropagation();
      this.categoryService.deleteCategory(category);
      this.categoryForm.reset();
      this.createMode = true;
    }

  }
}
