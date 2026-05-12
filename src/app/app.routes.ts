import { Routes } from '@angular/router';
import { authGuard } from '../app/core/guards/auth-guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/containers/home/home').then(
        (m) => m.HomeComponent
      ),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/product-detail/containers/product-detail/product-detail').then(
        (m) => m.ProductDetailComponent
      ),
  },
  {
    path: 'auth',
    loadComponent: () =>
      import('../app/features/auth/containers/auth/auth').then(
        (m) => m.AuthComponent
      ),
  },
  {
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../app/features/cart/containers/cart/cart').then(
        (m) => m.CartComponent
      ),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('../app/features/profile/containers/profile/profile').then(
        (m) => m.ProfileComponent
      ),
  },
  {
    path: 'quotes',
    loadComponent: () =>
      import('../app/features/quotes/containers/quotes/quotes').then(
        (m) => m.QuotesComponent
      ),
  },
  {
    path: 'qrcode',
    loadComponent: () =>
      import('../app/features/qrcode/containers/qrcode/qrcode').then(
        (m) => m.QrcodeComponent
      ),
  },
    
{
  path: 'admin',
  loadComponent: () =>
    import('./features/admin/containers/admin/admin').then(
      (m) => m.AdminComponent
    ),
},
  {
    path: '**',
    redirectTo: '',
  },

];