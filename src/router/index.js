import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index.js';

Vue.use(VueRouter)

const routes = [
  {
    meta: {
      title: 'Dashboard',
      requiresAuth: true
    },
    path: '/',
    name: 'home',
    component: () => import('../views/timeEntry/NewTimeEntry.vue'),
  },
  {
    meta: {
      title: 'new timeEntry',
      requiresAuth: true
    },
    path: '/timeEntry/new:id',
    name: 'timeEntry.new',
    component: () => import('../views/timeEntry/NewTimeEntry.vue'),
    props: true
  },
  {
    meta: {
      title: 'client-register',
      requiresUnauth: true
    },
    path: '/client/register',
    name: 'client-register',
    component: () => import('../views/auth/Register.vue'),
    props: true
  },
  {
    meta: {
      title: 'password-reset',
      requiresUnauth: true
    },
    path: '/client/password-reset',
    name: 'password-reset',
    component: () => import ('../views/auth/PasswordReset.vue'),
    props: true
  },
  {
    meta: {
      title: 'password-reset-callback',
      requiresUnauth: true
    },
    path: '/client/password-reset:id',
    name: 'password-reset-callback',
    component: () => import ('../views/auth/PasswordResetCallback.vue'),
    props: true
  },
  {
    meta: {
      title: 'client-login',
      requiresUnauth: true,
    },
    path: '/client/login',
    name: 'client-login',
    component: () => import( '../views/auth/Login.vue'),
    props: true
  },
  {
    meta: {
      title: 'mail-verification',
      requiresUnauth: true,
    },
    path: '/client/password-reset/verification',
    name: 'mail-verification',
    component: () => import( '../views/auth/MailVerification.vue'),
    props: true
  },
  {
    meta: {
      title: 'Employee Dashboard',
      requiresAuth: true
    },
    path: '/client/dashboard:id',
    name: 'Employee Dashboard',
    component: () => import( '../views/employee/UserDashboard.vue'),
    props: true
  },
  {
    meta: {
      title: 'Employees Dashboard',
      requiresAuth: true
    },
    path: '/client/dashboard',
    name: 'Employees Dashboard',
    component: () => import( '../views/employee/UsersDashboard.vue'),
    props: true
  },
  {
    meta: {
      title: 'Employee Reports',
      requiresAuth: true
    },
    path: '/client/reports',
    name: 'Employee Reports',
    component: () => import( '../views/report/UserReports.vue'),
    props: true
  },
  {
    meta: {
      title: 'Employee Report',
      requiresAuth: true
    },
    path: '/client/report:id',
    name: 'Employee Report',
    component: () => import( '../views/report/UserReport.vue'),
    props: true
  },
  {
    meta: {
      title: 'Project Dashboards',
      requiresAuth: true
    },
    path: '/project/dashboard',
    name: 'Projects Dashboards',
    component: () => import( '../views/project/ProjectsDashboard.vue'),
    props: true
  },
  {
    meta: {
      title: 'Project Creation',
      requiresAuth: true
    },
    path: '/projects/new',
    name: 'Project Creation',
    component: () => import( '../views/project/NewProject.vue'),
    props: true
  },
  {
    meta: {
      title: 'Project Dashboard',
      requiresAuth: true
    },
    path: '/project/dashbaord:id',
    name: 'Project Dashboard',
    component: () => import( '../views/project/ProjectDashboard.vue'),
    props: true
  },
  {
    meta: {
      title: 'Project Reports',
      requiresAuth: true
    },
    path: '/project/reports',
    name: 'Project Reports',
    component: () => import( '../views/report/UserReport.vue'),
    props: true
  },
  {
    meta: {
      title: 'Project Report',
      requiresAuth: true
    },
    path: '/project/report:id',
    name: 'Project Report',
    component: () => import( '../views/report/ProjectReports.vue'),
    props: true
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})

router.beforeEach(function(to, _, next) {
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    next('/client/login');
  } else if (to.meta.requiresUnauth && store.getters.isAuthenticated) {
    next(`/client/dashboard:${store.getters.getUserId}`);
  } else {
    next();
  }
});

export default router
