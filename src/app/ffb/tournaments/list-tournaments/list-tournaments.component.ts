import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-tournaments',
  templateUrl: './list-tournaments.component.html',
  styleUrl: './list-tournaments.component.scss'
})
export class ListTournamentsComponent {

  lambdaUrls: { title: string, url: string }[] = [
    // { title: 'URL de fonction', url: 'https://dkp2wacqnck5rqyzxtytk6tvya0hzldq.lambda-url.eu-west-3.on.aws/' },
    { title: 'API Gateway end point', url: 'https://6j9tjfcswh.execute-api.eu-west-3.amazonaws.com/test/helloworld?greeter=JohnDa' }
  ];


  lambda_resp$: Observable<string> = new Observable<string>();
  constructor(
    private httpClient: HttpClient
  ) {
  }

  lambda_get(url: string) {
    this.lambda_resp$ = this.httpClient.get<string>(url, { responseType: 'json' });
  }

  clear_resp() {
    this.lambda_resp$ = new Observable<string>();
  }
}

//https://vejhvceerbabxearhyiz6erhyu0kcrgy.lambda-url.eu-west-3.on.aws/
