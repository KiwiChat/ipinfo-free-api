import { createRouter, createWebHistory } from 'vue-router';

const Home = () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
const Asn = () => import(/* webpackChunkName: "asn" */ '../views/Asn.vue')
const About = () => import(/* webpackChunkName: "about" */ '../views/About.vue')
const Ipcheck = () => import(/* webpackChunkName: "ipcheck" */ '../views/Ipcheck.vue')

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Ipcheck,
    meta: {
      title: 'IP检测工具 - 国内外IP地址检测',
      subtitle: '免费在线IP检测工具',
      description: '使用我们的免费在线工具快速检测您的IP地址，判断是国内还是国外IP。'
    },
  },
  {
    path: '/ip-check',
    name: 'IPCheck',
    component: Ipcheck,
    meta: {
      title: 'IP地址检测 - 国内外IP识别工具',
      subtitle: '在线IP地址检测',
      description: '快速准确地检测您的IP地址，了解您的IP是来自国内还是国外。'
    },
  },
  {
    path: '/ip-information',
    name: 'IP',
    component: Home,
    meta: {
      title: 'IP信息查询 - 详细IP地址信息',
      subtitle: 'IP地址详细信息查询',
      description: '获取您的IP地址的详细信息，包括地理位置、ISP等。'
    },
  },
  {
    path: '/asn-lookup',
    name: 'ASN',
    component: Asn,
    meta: {
      title: 'ASN查询工具 - IP ASN检测',
      subtitle: 'ASN号码查询',
      description: '使用我们的ASN查询工具，快速查找IP地址对应的自治系统号码（ASN）。'
    },
  },
  {
    path: '/about-us',
    name: 'About',
    component: About,
    meta: {
      title: '关于我们 - IP检测工具团队',
      subtitle: '了解我们的团队',
      description: '了解我们的团队背景、使命和为什么我们致力于提供最好的IP检测工具。'
    }
  },
  {
    path: '/contact-us',
    name: 'Contact',
    meta: {
      title: '联系我们 - 获取支持和反馈',
      subtitle: '联系我们的团队',
      description: '有问题或建议？联系我们的团队，我们随时为您提供帮助。'
    },
    component: () => import(/* webpackChunkName: "route-contact" */ '../views/Contact.vue')
  },
  {
    path: '/api-documentation',
    name: 'Docs',
    meta: {
      title: 'API文档 - IP检测工具接口使用指南',
      subtitle: 'API使用文档',
      description: '查看我们的API文档，了解如何将IP检测功能集成到您的应用程序中。'
    },
    component: () => import(/* webpackChunkName: "route-docs" */ '../views/Docs.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const title = to.meta.title || 'IP Address Lookup Tool'
  const subtitle = to.meta.subtitle || ''
  const description = to.meta.description || 'Free IP Address Lookup tool. Get detailed information about any IP address including location, ISP, and more.'
  document.title = subtitle ? `${title} - ${subtitle}` : title

  // Update meta tags
  updateMetaTag('description', description)
  updateMetaTag('og:title', title)
  updateMetaTag('og:description', description)
  updateMetaTag('twitter:title', title)
  updateMetaTag('twitter:description', description)

  next()
})

function updateMetaTag(name, content) {
  let meta = document.querySelector(`meta[name="${name}"]`)
  if (!meta) {
    meta = document.createElement('meta')
    meta.name = name
    document.head.appendChild(meta)
  }
  meta.content = content
}

export default router
