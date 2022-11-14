import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './auth.guard';
import {ResetPasswordHomeComponent} from './forgot-password/reset-password-home/reset-password-home.component';
const routes: Routes = [
    {
        path: '', loadChildren: async () => {
            const dyamicImport = await import('./home/home.module')
            return dyamicImport.HomeModule
        }
    }, {
        path: 'register', loadChildren: async () => {
            const dyamicImport = await import('./register/register.module')
            return dyamicImport.RegisterModule
        }
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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
