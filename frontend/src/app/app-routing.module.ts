import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {ResetPasswordHomeComponent} from './forgot-password/reset-password-home/reset-password-home.component';
import {GuestGuard} from './guest.guard';
const routes: Routes = [
    {
        path: '', loadChildren: async () => {
            const dyamicImport = await import('./home/home.module')
            return dyamicImport.HomeModule
        }, canActivate: [GuestGuard]
    }, {
        path: 'register', loadChildren: async () => {
            const dyamicImport = await import('./register/register.module')
            return dyamicImport.RegisterModule
        }, canActivate: [GuestGuard]
    },
    {
        path: 'arrow', loadChildren: async () => {
            const dyamicImport = await import('./arrow/arrow.module');
            return dyamicImport.ArrowModule;
        }
    },
    {
        path: 'forgot-password', loadChildren: async () => {
            const dyamicImport = await import('./forgot-password/forgot-password.module');
            return dyamicImport.ForgotPasswordModule;
        }
    },
    {
        path: 'reset-password', component: ResetPasswordHomeComponent,
    },
    {
        path: 'settings', canActivate: [AuthGuard], loadChildren: async () => {
            const dyamicImport = await import('./settings/settings.module');
            return dyamicImport.SettingsModule;
        }

    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
