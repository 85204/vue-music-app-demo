import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/Recommend'
import Singer from 'components/Singer'
import Rank from 'components/Rank'
import Search from 'components/Search'
import singerDetail from 'components/singer-detail'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/',
      redirect: '/recommend'
    },
  ]
})
