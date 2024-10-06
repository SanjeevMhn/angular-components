import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { TablesComponent } from './tables/tables.component';

export const routes: Routes = [
	{ 
		path: 'home', 
		component: BaseLayoutComponent,
		children: [
			{ path: 'dashboard', component: DashboardComponent },
			{ path: 'forms', component: FormsComponent },
			{ path: 'tables', component: TablesComponent },
			{ path: '', redirectTo: 'dashboard', pathMatch: 'full'},
		]
	},
	{
		path: '',
		redirectTo: 'home',
		pathMatch: 'full'
	}
];
