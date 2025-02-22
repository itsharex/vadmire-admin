<script setup lang="ts">
import { VAdmireMenuOption } from 'naive-ui'
import { useDeepClone } from '@flypeng/tool/browser'
import { transformMenu } from '~/utils'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const routeMenuStore = useRouteMenuStore()
const { breadCrumbMenus, vadmireMenu } = storeToRefs(routeMenuStore)

interface GlobalMenuProps {
  mode?: 'vertical' | 'horizontal'
  menuOptions: VAdmireMenuOption[]
}

const props = withDefaults(defineProps<GlobalMenuProps>(), {
  mode: 'vertical',
  menuOptions: () => [],
})

const transformMenuList = computed(() => {
  const menuOptions = useDeepClone(props.menuOptions) as VAdmireMenuOption[]
  const i18nMenu = menuOptions.map((menu) => transformMenu(menu, t))
  return i18nMenu
})

// route key whether include from menu
const isIncludeMenuByKey = (key: string, menu: VAdmireMenuOption): boolean => {
  if (key === menu.key) return true
  if (menu.children) return menu.children.some((item) => isIncludeMenuByKey(key, item))
  return false
}

// get breadcrumb menu
const getBreadCrumbMenu = (key: string, menu: VAdmireMenuOption) => {
  const breadCrumbMenu: VAdmireMenuOption[] = []
  breadCrumbMenu.push(menu)
  const getMenuByKey = (item: VAdmireMenuOption) => {
    if (item.children) {
      item.children.forEach((child) => {
        if (isIncludeMenuByKey(key, child)) {
          breadCrumbMenu.push(child)
          getMenuByKey(child)
        }
      })
    }
  }
  getMenuByKey(menu)
  return breadCrumbMenu
}

// generate breadcrumb menu
const createBreadCrumbMenu = (key: string, menus: VAdmireMenuOption[]) => {
  let parentMenu: VAdmireMenuOption = {}
  for (let i = 0; i < menus.length; i++) {
    const isIncludeRouteKey = isIncludeMenuByKey(key, menus[i])
    if (isIncludeRouteKey) parentMenu = menus[i]
  }
  return getBreadCrumbMenu(key, parentMenu)
}

// watch the route and change current checked menu
const routeKey = ref(route.name as string)
watchEffect(() => {
  routeKey.value = route.name as string

  // generate breadcrumb menu
  // @ts-ignore
  breadCrumbMenus.value = createBreadCrumbMenu(routeKey.value, vadmireMenu.value)
})

// click menu
const clickMenu = (key: string, menu: VAdmireMenuOption) => {
  if (menu.link === 'EXTERNAL_LINK' && menu.url) {
    window.open(menu.url as string)
  } else {
    // create tab menu key
    routeMenuStore.createTabMenuKey(key as string)
    router.push({ name: key })
  }
}

onMounted(() => {
  // create tab menu key
  routeMenuStore.createTabMenuKey(route.name as string)
})
</script>

<template>
  <NMenu
    id="driver-step-1"
    :value="routeKey"
    :mode="mode"
    :options="transformMenuList"
    @update:value="clickMenu"
  />
</template>

<style lang="scss">
/* menu icon center */
div.n-menu-item-content--collapsed {
  padding-left: 17px !important;
}
</style>
