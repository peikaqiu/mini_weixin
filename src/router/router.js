import Vue from 'vue';
import Router from 'vue-router';
import MessageView from '../views/MessageView'
import ChatView from '../views/CharView/ChatView'
import FriendMsg from '../views/Friends/FriendMsg'
import DiscoverMsg from '../views/Discover/DiscoverMsg'
import SearchView from '../views/SearchView/SearchView'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/MessageView',
      name: 'MessageView',
      component: MessageView,
      children:[
        {
          path: 'ChatView',
          name: 'ChatView',
          component: ChatView,
        },
        {
          path: 'SearchView',
          name: 'SearchView',
          component: SearchView,
        }
      ]
    },
    {
      path: '/FriendsView',
      name: 'FriendsView',
      component: () => import('../views/Friends/FriendsView.vue'),
      children:[
        {
          path: 'FriendMsg',
          name: 'FriendMsg',
          component: FriendMsg,
        }
      ]
    },
    {
      path: '/DiscoverView',
      name: 'DiscoverView',
      component: () => import('../views/Discover/DiscoverView.vue'),
      children:[
        {
          path: 'DiscoverMsg',
          name: 'DiscoverMsg',
          component: DiscoverMsg,
        }
      ]
    },
    {
      path: '/MySelfView',
      name: 'MySelfView',
      component: () => import('../views/MySelfView.vue'),
    }
  ],
});
