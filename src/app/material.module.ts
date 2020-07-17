import { NgModule } from '@angular/core';

import { OverlayModule } from '@angular/cdk/overlay';
import { CdkTreeModule } from '@angular/cdk/tree';
import { PortalModule } from '@angular/cdk/portal';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';  
import { MatRippleModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'; 
import { MatMenuModule } from '@angular/material/menu';  
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';  
import { MatToolbarModule } from '@angular/material/toolbar'; 
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

const materialModules = [
    CdkTreeModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatSlideToggleModule, 
    MatDividerModule,
    MatExpansionModule,
    MatIconModule,
    MatInputModule, 
    MatMenuModule, 
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatSortModule, 
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonToggleModule, 
    OverlayModule,
    PortalModule
  ];
  
  @NgModule({
    imports: [
      ...materialModules
    ],
    exports: [
      ...materialModules
    ],
  })
  export class MaterialModule {
  } 
  