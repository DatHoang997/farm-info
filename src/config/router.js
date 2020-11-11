
import NotFound from '@/module/page/error/notfound'
import Home from '@/module/page/home/index'
import Login from '@/module/page/auth/login'

export default [
  // {
  //   path: '/category',
  //   page: Category,
  //   auth: true
  // },
  {
    path: '/404',
    page: NotFound
  },
  {
    path: '/',
    page: Home,
  },
  {
    path: '/login',
    page: Login,
  },
  {
    page: NotFound
  }
]
