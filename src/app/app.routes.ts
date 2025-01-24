import { Routes } from '@angular/router';
import { VehicleMakesComponent } from './vehicle-makes/vehicle-makes.component';
import { VehicleTypesComponent } from './vehicle-types/vehicle-types.component'


export const routes: Routes = 
[
    { path: '', component: VehicleMakesComponent },
    { path: 'vehicle-types/:id', component: VehicleTypesComponent },
];
