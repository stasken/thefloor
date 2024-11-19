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
        loadChildren: () => import('../pages/settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: 'board',
        canActivate: [GameIdGuard],
        loadChildren: () => import('../pages/board/board.module').then(m => m.BoardPageModule)
      },
      {
        path: 'duel',
        canActivate: [GameIdGuard],
        loadChildren: () => import('../pages/duel/duel.module').then(m => m.DuelPageModule)
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
