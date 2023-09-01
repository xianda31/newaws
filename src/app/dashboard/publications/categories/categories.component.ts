import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Category } from 'src/app/API.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';
import { environment } from 'src/app/environments/environment';

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

  fileTooBig: boolean = false;
  maxSize: string = environment.max_category_image_size_text;

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {

    this.categoryForm = new FormGroup({
      label: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
      // image: new FormControl('', Validators.required),
    });

  }

  get label() { return this.categoryForm.get('label')!; }
  get description() { return this.categoryForm.get('description')!; }
  // get image() { return this.categoryForm.get('image')!; }

  selectCategory(category: Category) {
    this.categoryForm.patchValue(category);
    this.createMode = false;
    this.selectedCategory = category;
  }

  // onImageChange(event: any) {
  //   const file: File = event.target.files[0];
  //   if (file.size > environment.max_category_image_size) {
  //     this.fileTooBig = true;
  //     return;
  //   }
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     const imgSrc = reader.result as string;
  //     this.image.setValue(imgSrc);
  //   };
  //   reader.readAsDataURL(file);
  //   console.log('file loaded ', file.name, file.size);

  // }

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
