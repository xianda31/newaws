import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import tinymce from 'tinymce';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';



// https://docs.amplify.aws/lib/storage/getting-started/q/platform/js/#configure-your-application


@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit, AfterViewInit {

  form!: FormGroup;
  content: string = '';
  any: boolean = true;
  sous_titre: string = 'édité le 18/01/58';
  saferHtml: SafeHtml = '';
  externalHtml: SafeHtml = '';

  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private http: HttpClient
  ) { }
  ngAfterViewInit(): void {
    this.tinymceInit('template2');
    console.log("ngAfterViewInit");
  }


  ngOnInit(): void {

    this.http.get('assets/html-templates/template_A.html', { responseType: 'text' }).subscribe(
      data => this.externalHtml = this.sanitizer.bypassSecurityTrustHtml(data)
    );

    this.form = this.fb.group({
      template: ['template2']
    });



    this.form.get('template')!.valueChanges.subscribe((template) => {
      tinymce.remove();
      this.tinymceInit(template);
      this.content = '';
    });

  }

  get template() {
    return this.form.get('template')!.value;
  }

  tinymceInit(selector: string) {
    // return
    console.log("tinymceInit(%s)", selector);
    tinymce.init({
      selector: "#" + selector,
      plugins: "preview code  searchreplace autolink autosave save directionality  visualblocks visualchars fullscreen image  media  codesample  table charmap pagebreak nonbreaking anchor  lists  wordcount ",
      height: '800px',
      format: 'html',
      content_css: "https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css",
      // skin: 'bootstrap',
      // toolbar_sticky: true,
      // linkchecker_service_url: 'http://mydomain.com/linkchecker',
      // autosave_restore_when_empty: true,
      editable_root: false,
      editable_class: 'editable',
    });

  }

  getContent() {
    const html = tinymce.activeEditor!.getContent();
    // this.saferHtml = this.sanitizer.bypassSecurityTrustHtml(html)
    this.saferHtml = html;
    console.log(this.saferHtml);
  }
}
