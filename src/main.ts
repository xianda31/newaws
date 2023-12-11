/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import aws_exports from './aws-exports';
import { Amplify } from 'aws-amplify/lib-esm';


Amplify.configure(aws_exports);

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
