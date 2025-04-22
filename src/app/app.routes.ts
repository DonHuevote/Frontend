import { Routes } from '@angular/router';
import { MostrarComponent } from './componentes/mostrar/mostrar.component';

export const routes: Routes = [
    { path: 'clases', component: MostrarComponent},
    { path: '', redirectTo: '/clases', pathMatch: 'full' }
];
