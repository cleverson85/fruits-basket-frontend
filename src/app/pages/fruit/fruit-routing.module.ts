import { ApiRoutesFruit } from './../../shared/enum/apiRoutesFruit.enum';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenericResolverGuard } from 'src/app/guards/generic.resolver.guard';
import { FruitEditComponent } from './fruit-edit/fruit-edit.component';
import { FruitComponent } from './fruit-list/fruit.component';

const routes: Routes = [
  {
    path: '',
    component: FruitComponent
  },
  {
    path: ':id',
    component: FruitEditComponent,
    resolve: { fruit: GenericResolverGuard },
    data: { resolverData: { url: `${ApiRoutesFruit.ID}` } },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FruitRoutingModule {}
