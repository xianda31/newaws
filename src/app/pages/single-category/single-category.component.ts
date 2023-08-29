import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from 'src/app/API.service';
import { CategoryService } from 'src/app/aws.services/category.aws.service';

@Component({
  selector: 'app-single-category',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.scss']
})
export class SingleCategoryComponent implements OnInit {

  theCategory!: Category;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoryService
  ) { }


  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(
      paramMap => {
        const id = paramMap.get('id')!;
        console.log('id : ', id);
        this.theCategory = this.categoryService.getCategoryById(id)!;

        console.log('theCategory : ', this.theCategory);

      }
    );
  }

}
