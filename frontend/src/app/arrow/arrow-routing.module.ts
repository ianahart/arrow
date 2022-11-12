import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ArrowHomeComponent} from './arrow-home/arrow-home.component';
import {AuthGuard} from '../auth.guard';
const routes: Routes = [
    {path: '', component: ArrowHomeComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArrowRoutingModule {}
