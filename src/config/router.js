
import NotFound from '@/module/page/error/notfound'
import ClaimSRM from '@/module/page/claimSRM/index'
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
    page: ClaimSRM,
  },
  {
    path: '/login',
    page: Login,
  },
  {
    page: NotFound
  }
]
