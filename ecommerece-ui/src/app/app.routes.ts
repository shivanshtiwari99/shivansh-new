import { Routes } from '@angular/router';
import { AuthLayout } from './shared/layouts/auth-layout/auth-layout';
import { AdminLayout } from './shared/layouts/admin-layout/admin-layout';
import { UserLayout } from './shared/layouts/user-layout/user-layout';
import { Login } from './features/auth/login/login';
import { Register } from './features/auth/register/register';
import { AdminDashboard } from './features/admin/admin-dashboard/admin-dashboard';
import { AdminCategory } from './features/admin/admin-category/admin-category';
import { authGuard } from './auth-guard';
import { AdminProduct } from './features/admin/admin-product/admin-product';
import { AdminUsers } from './features/admin/admin-users/admin-users';  
import { UserCategory } from './features/user/user-category/user-category';
import { CategoryProduct } from './features/user/categoryproduct/categoryproduct';
import { AllProduct } from './features/user/userproduct/userproduct';
import { ProfileComponent } from './features/user/profile/profile';
import { CartComponent } from './features/user/cart/cart';
import { Checkout } from './features/user/checkout/checkout';
import { MyordersComponent } from './features/user/myorders/myorders';
import { OrderdetailsComponent } from './features/user/orderdetails/orderdetails';
import { AdminOrders } from './features/admin/admin-orders/admin-orders';

export const routes: Routes = [

  // Auth pages
  {
    path: '',
    component: AuthLayout,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login', component: Login },
      { path: 'register', component: Register }
    ]
  },

  // Admin pages inside Admin Layout
  {
    path: '',
    component: AdminLayout,
    
    canActivate: [authGuard],
    data: { role: 'admin' },
    children: [
      { path: 'admin-dashboard', component: AdminDashboard },
      { path: 'category', component: AdminCategory },
      {path:'product',component:AdminProduct},
      {path:'user',component:AdminUsers},
      { path: 'orders', component: AdminOrders }
      // aur admin ke aur pages add kar sakte ho
    ]
  },
  

  // User pages inside User Layout
  {
    path: '',
    component: UserLayout,
    canActivate: [authGuard],
    data: { role: 'user' },
    children: [
      {path:'userCategory',component:UserCategory},
      {path:'cProduct',component:CategoryProduct},
      {path:'userProduct',component:AllProduct},
      {path:'profile',component:ProfileComponent},
      {path:'cart',component:CartComponent},
      {path:'checkout',component:Checkout},
      {path:'myorder',component:MyordersComponent},
      {path:'orderdetails/:id',component:OrderdetailsComponent},
      // aur user ke aur pages add kar sakte ho
    ]
  }

];