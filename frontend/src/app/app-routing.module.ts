import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

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
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
