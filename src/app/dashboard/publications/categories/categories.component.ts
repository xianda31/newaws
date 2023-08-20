import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from 'src/app/API.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {

  categoryForm!: FormGroup;
  categories$: Observable<Category[]> = this.categoryService.categories$;
  createMode: boolean = true;
  selectedCategory!: Category;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {

    this.categoryForm = new FormGroup({
      label: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
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


  deleteCategory(event: any, category: Category) {
    event.stopPropagation();
    this.categoryService.deleteCategory(category);
    this.categoryForm.reset();
    this.createMode = true;
  }

}
