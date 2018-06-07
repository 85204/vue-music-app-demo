import Vue from 'vue'
import Router from 'vue-router'
import Recommend from 'components/Recommend'
import Singer from 'components/Singer'
import Rank from 'components/Rank'
import Search from 'components/Search'
import singerDetail from 'components/singer-detail'
import Disc from 'components/disc'
import TopList from 'components/top-list'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
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
      component: Rank,
      children: [
        {
          path: ':id',
          component: TopList
        }
      ]
    },
    {
      path: '/search',
      component: Search,
      children: [
        {
          path: ':id',
          component: singerDetail
        }
      ]
    },
    {
      path: '/',
      redirect: '/recommend'
    },
  ]
})
