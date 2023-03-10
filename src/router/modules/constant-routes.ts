import { VAdmireRoute } from '..'

export const CONSTANT_ROUTES: VAdmireRoute[] = [
  {
    path: '/about',
    name: 'SystemAbout',
    component: 'Layout',
    children: [
      {
        path: '',
        name: 'SystemAboutIndex',
        component: '~/views/SystemAbout.vue',
        meta: {
          text: '关于',
          icon: 'mdi:about-variant',
          single: true,
        },
      },
    ],
  },
  {
    path: '/common',
    name: 'CommonPage',
    component: 'Layout',
    meta: {
      text: '常用页面',
      icon: 'cib:creative-commons-share',
    },
    children: [
      {
        path: '404',
        name: 'Common_NotFound',
        component: '~/views/common/NotFound.vue',
        meta: {
          text: '404',
          icon: 'tabler:error-404',
        },
      },
      {
        path: '500',
        name: 'Common_ServerDown',
        component: '~/views/common/ServerDown.vue',
        meta: {
          text: '500',
          icon: 'la:500px',
        },
      },
    ],
  },
  {
    path: '/feature',
    name: 'Feature',
    component: 'Layout',
    meta: {
      text: '常用功能',
      icon: 'mdi:feature-highlight',
    },
    children: [
      {
        path: 'icon',
        name: 'Feature_Icon',
        component: '~/views/features/Icons.vue',
        meta: {
          text: '图标',
          icon: 'line-md:iconify1',
        },
      },
      {
        path: 'permission',
        name: 'Feature_Permission',
        component: '~/views/features/Permissions.vue',
        meta: {
          text: '权限',
          icon: 'arcticons:permissionchecker',
        },
      },
    ],
  },
  {
    path: '/level-1',
    name: 'Level-1',
    component: 'Layout',
    meta: {
      text: '多级菜单',
      icon: 'mdi:feature-highlight',
    },
    children: [
      {
        path: 'level-2-1',
        name: 'Level-1_Level-2-1',
        component: '~/views/level/Level-2-1.vue',
        meta: {
          text: 'Level-2-1',
          icon: 'line-md:iconify1',
        },
      },
      {
        path: 'level-2-2',
        name: 'Level-1_Level-2-2',
        meta: {
          text: 'Level-2-2',
          icon: 'line-md:iconify1',
        },
        children: [
          {
            path: 'level-3-1',
            name: 'Level-1_Level-2-2_Level-3-1',
            component: '~/views/level/Level-3-1.vue',
            meta: {
              text: 'Level-3-1',
              icon: 'line-md:iconify1',
            },
          },
          {
            path: 'level-3-2',
            name: 'Level-1_Level-2-2_Level-3-2',
            component: '~/views/level/Level-3-2.vue',
            meta: {
              text: 'Level-3-2',
              icon: 'line-md:iconify1',
            },
          },
          {
            path: 'level-3-3',
            name: 'Level-1_Level-2-2_Level-3-3',
            meta: {
              text: 'Level-3-3',
              icon: 'line-md:iconify1',
            },
            children: [
              {
                path: 'level-4-1',
                name: 'Level-1_Level-2-2_Level-3-3_Level-4-1',
                component: '~/views/level/Level-4-1.vue',
                meta: {
                  text: 'Level-4-1',
                  icon: 'line-md:iconify1',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/',
    name: 'Home',
    redirect: '/about',
    meta: {
      isShow: false,
    },
  },
  {
    path: '/login',
    name: 'SystemAuth',
    component: '~/views/auth/SystemAuth.vue',
    meta: {
      text: 'SystemAuth',
      isShow: false,
    },
  },
  {
    path: '/404',
    name: 'SystemNotFound',
    component: '~/views/common/NotFound.vue',
    meta: {
      text: '404',
      isShow: false,
    },
  },
]

export const MATCH_404_ROUTES: VAdmireRoute = {
  path: '/:catchAll(.*)',
  redirect: '/404',
  name: 'Match_404',
  meta: {
    isShow: false,
  },
}
