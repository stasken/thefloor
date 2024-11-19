import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';
import { GameIdGuard } from '../guards/game-id.guard';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'init',
        loadChildren: () => import('../pages/init/init.module').then( m => m.InitPageModule)
      },
      {
        path: 'settings',
        canActivate: [GameIdGuard],
        loadChildren: () => import('../pages/tab1/tab1.module').then(m => m.Tab1PageModule)
      },
      {
        path: 'board',
        canActivate: [GameIdGuard],
        loadChildren: () => import('../pages/tab2/tab2.module').then(m => m.Tab2PageModule)
      },
      {
        path: 'duel',
        canActivate: [GameIdGuard],
        loadChildren: () => import('../pages/tab3/tab3.module').then(m => m.Tab3PageModule)
      },
      {
        path: '',
        redirectTo: '/init',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/init',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/init',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
