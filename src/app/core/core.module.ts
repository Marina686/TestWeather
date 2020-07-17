import { NgModule, ErrorHandler } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BrowserModule } from "@angular/platform-browser";
import { NoopAnimationsModule, BrowserAnimationsModule } from "@angular/platform-browser/animations"; 
import { FlexLayoutModule } from "@angular/flex-layout";
import { LayoutModule } from "@angular/cdk/layout";
import { ReactiveFormsModule } from "@angular/forms"; 
 
import { HTTP_INTERCEPTORS } from "@angular/common/http"; 
import { HttpErrorInterceptor } from "./interceptors/http-error.interceptor";
import { GlobalErrorHandler } from "./classes/global-error-handler";
 

const MODULES = [ 
  ReactiveFormsModule, 
  FlexLayoutModule,
  LayoutModule 
];
const MATERIAL_IMPORTS = [
  BrowserAnimationsModule 
];


@NgModule({
  declarations: [],
  imports: [CommonModule, BrowserModule, ...MODULES, ...MATERIAL_IMPORTS],
  exports: [...MODULES, ...MATERIAL_IMPORTS],
  providers: [ 
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpErrorInterceptor,
      multi: true
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler
    }
  ]
})
export class CoreModule { }
