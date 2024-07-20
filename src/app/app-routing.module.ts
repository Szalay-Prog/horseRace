import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HorseRaceSetupComponent } from './horse-race-setup/horse-race-setup.component';
import { HorseRaceComponent } from './horse-race/horse-race.component';

const routes: Routes = [
  { path: '', redirectTo: '/setup', pathMatch: 'full' },
  { path: 'setup', component: HorseRaceSetupComponent },
  { path: 'race', component: HorseRaceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
