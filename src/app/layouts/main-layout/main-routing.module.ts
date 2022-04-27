import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { MainLayoutComponent } from "./main-layout.component";
import { AuthGuard } from "@app-core/auth-guard/auth.guard";
import { PuntosColombiaComponent } from "@app-modules/puntos-colombia/components/principal/puntos-colombia.component";
import { UberComponent } from "@app-modules/uber/components/principal/uber.component";

const routes: Routes = [
  {
    path: "",
    component: MainLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        pathMatch: "full",
        redirectTo: "dashboard",
      },
      {
        path: "dashboard",
        pathMatch: "full",
        loadChildren: () =>
          import("../../modules/dashboard/dashboard.module").then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'uber',
        component: UberComponent
      },
      {
        path: 'puntos',
        component: PuntosColombiaComponent
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainRoutingModule {}
