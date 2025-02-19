import { Routes } from '@angular/router';
import { BaseLayoutComponent } from './base-layout/base-layout.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsComponent } from './forms/forms.component';
import { TablesComponent } from './tables/tables.component';
import { LoginComponent } from './login/login.component';
import { CustomizableDashboardComponent } from './customizable-dashboard/customizable-dashboard.component';

export const routes: Routes = [
	{ 
		path: 'home', 
		component: BaseLayoutComponent,
		children: [
			{ path: 'dashboard', component: DashboardComponent },
			{ path: 'forms', component: FormsComponent },
			{ path: 'tables', component: TablesComponent },
			{ path: 'customizable-dashboard', component: CustomizableDashboardComponent },
			{ path: '', redirectTo: 'customizable-dashboard', pathMatch: 'full'},
		]
	},
	{
		path: 'login',
		component: LoginComponent
	},
	{
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	}
];
