import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RaceAreaComponent } from './components/race-area/race-area.component';
import { SettingsComponent } from './components/settings/settings.component';

const routes: Routes = [
  { path: '', redirectTo: '/race', pathMatch: 'full' },
  { path: 'race', component: RaceAreaComponent },
  { path: 'settings', component: SettingsComponent },
  // Add other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
