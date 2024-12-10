import ErroNotFound from '../pages/ErrorNotFound.vue';

const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [            
      { path: '/dashboard', component: () => import('pages/DashboardPage.vue'), meta: { requiresAuth: true }},
      { path: '/users', component: () => import('pages/UsersPage.vue'), meta: { requiresAuth: true }},
    ],    
  },
  { path: '/login', component: () => import('pages/LoginPage.vue') },
  {
    path: '/:catchAll(.*)',  
    name: 'ErroNotFound',
    component: ErroNotFound,
  },
]

export default routes
