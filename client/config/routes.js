
export default [
  {
    path: '/app/:id',
    component: () => import('../views/todo/todo.vue'),
    props: (route) => ({id:route.query.id})
  },
  {
    path: '/login',
    component: () => import('../views/login/login.vue')
  }
]