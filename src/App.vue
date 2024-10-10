<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <router-link class="navbar-item" to="/">
            <span class="logo">IP<span class="logo-highlight">Lookup</span></span>
          </router-link>

          <!-- 添加 is-hidden-desktop 类 -->
          <a role="button" class="navbar-burger is-hidden-desktop" aria-label="menu" aria-expanded="false"
            data-target="navbarBasicExample" @click="toggleNavMenu">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbarBasicExample" :class="{ 'is-active': isNavMenuActive }" class="navbar-menu">
          <div class="navbar-start">
            <router-link class="navbar-item custom-nav-item" to="/ip-information">IP Lookup</router-link>
            <router-link class="navbar-item custom-nav-item" to="/asn-lookup">ASN Lookup</router-link>
            <router-link class="navbar-item custom-nav-item" to="/api-documentation">Documentation</router-link>

            <div class="navbar-item has-dropdown" :class="{ 'is-active': isMoreDropdownActive }"
              @click="toggleMoreDropdown">
              <a class="navbar-link custom-nav-item">
                More
              </a>

              <div class="navbar-dropdown custom-dropdown">
                <router-link class="navbar-item custom-dropdown-item" to="/about-us">About</router-link>
                <router-link class="navbar-item custom-dropdown-item" to="/contact">Contact</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <router-view />
    <footer class="footer">
      <div class="content has-text-centered">
        <p class="copyright">
          © 2023 IP Address Lookup. All rights reserved.
        </p>
        <p class="links">
          <router-link to="/privacy-policy">Privacy Policy</router-link> |
          <router-link to="/terms-of-service">Terms of Service</router-link> |
          <router-link to="/contact">Contact Us</router-link>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isNavMenuActive: false,
      isMoreDropdownActive: false,
    };
  },
  methods: {
    toggleNavMenu() {
      this.isNavMenuActive = !this.isNavMenuActive;
    },
    toggleMoreDropdown(event) {
      // 阻止事件冒泡，以防止触发 toggleNavMenu
      event.stopPropagation();
      this.isMoreDropdownActive = !this.isMoreDropdownActive;
    },
  },
};
</script>

<style>
:root {
  --primary-color: #1a237e;
  /* 深蓝色 */
  --secondary-color: #283593;
  /* 稍浅的蓝色 */
  --accent-color: #00bcd4;
  /* 青色 */
  --text-color: #ffffff;
  /* 纯白色 */
  --hover-color: rgba(255, 255, 255, 0.2);
  --active-color: rgba(255, 255, 255, 0.3);
  --logo-gradient-start: #4fc3f7;
  /* 浅蓝色 */
  --logo-gradient-end: #b3e5fc;
  /* 更浅的蓝色 */
  --nav-text-color: #b3e5fc;
  /* 浅蓝色，用于导航文字 */
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

.navbar {
  background-color: var(--primary-color) !important;
  padding: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.navbar-brand .navbar-item {
  padding: 0;
}

.logo {
  font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -1px;
  color: var(--text-color);
  text-decoration: none;
  padding: 0.5rem 1rem;
  background: linear-gradient(45deg, var(--logo-gradient-start), var(--logo-gradient-end));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  border-inline-color: transparent;
}

.logo-highlight {
  font-weight: 300;
}

/* 导航项和链接的基本样式 */
.navbar-item,
.navbar-link {
  color: var(--nav-text-color) !important;
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* 导航项和链接的悬停状态 */
.navbar-item:hover,
.navbar-link:hover,
.navbar-item.is-active,
.navbar-link.is-active {
  background-color: var(--hover-color) !important;
  color: var(--text-color) !important;
}

/* 下拉菜单触发器样式 */
.navbar-item.has-dropdown .navbar-link {
  background-color: transparent !important;
  color: var(--nav-text-color) !important;
}

.navbar-item.has-dropdown:hover .navbar-link,
.navbar-item.has-dropdown.is-active .navbar-link {
  background-color: var(--hover-color) !important;
  color: var(--text-color) !important;
}

/* 下拉菜单样式 */
.navbar-dropdown.custom-dropdown {
  background-color: var(--primary-color) !important;
  border-top: none !important;
  border-radius: 0 0 4px 4px !important;
  padding: 0.5rem 0 !important;
  box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1) !important;
}

.navbar-dropdown.custom-dropdown .navbar-item.custom-dropdown-item {
  color: var(--nav-text-color) !important;
  padding: 0.75rem 1rem !important;
  background-color: transparent !important;
}

.navbar-dropdown.custom-dropdown .navbar-item.custom-dropdown-item:hover,
.navbar-dropdown.custom-dropdown .navbar-item.custom-dropdown-item:focus {
  background-color: var(--hover-color) !important;
  color: var(--text-color) !important;
}

/* 确保下拉菜单在激活状态下保持正确的样式 */
.navbar-item.has-dropdown.is-active .navbar-dropdown.custom-dropdown {
  display: block !important;
}

/* 下拉菜单项的激活状态 */
.navbar-dropdown.custom-dropdown .navbar-item.custom-dropdown-item.is-active {
  background-color: var(--active-color) !important;
  color: var(--text-color) !important;
}

.navbar-burger {
  color: var(--text-color);
  height: 4rem;
}

.navbar-burger:hover {
  background-color: var(--hover-color);
}

/* 修改媒体查询中的样式 */
@media screen and (max-width: 1023px) {
  #app .navbar-menu {
    background-color: var(--primary-color) !important;
    padding: 0;
  }

  #app .navbar-item,
  #app .navbar-link {
    color: var(--nav-text-color) !important;
  }

  #app .navbar-item:hover,
  #app .navbar-link:hover,
  #app .navbar-item.is-active,
  #app .navbar-link.is-active {
    background-color: var(--hover-color) !important;
    color: var(--text-color) !important;
  }

  #app .navbar-dropdown {
    background-color: var(--primary-color) !important;
    border: none !important;
    box-shadow: none !important;
  }

  #app .navbar-dropdown .navbar-item {
    color: var(--nav-text-color) !important;
    padding: 0.75rem 1.5rem;
  }

  #app .navbar-dropdown .navbar-item:hover {
    background-color: var(--hover-color) !important;
    color: var(--text-color) !important;
  }

  #app .navbar-item.has-dropdown .navbar-link {
    background-color: transparent !important;
  }

  #app .navbar-item.has-dropdown .navbar-link:hover,
  #app .navbar-item.has-dropdown.is-active .navbar-link {
    background-color: var(--hover-color) !important;
  }

  /* 确保 "More" 下拉菜单正确显示 */
  #app .navbar-item.has-dropdown {
    padding: 0 !important;
  }

  #app .navbar-item.has-dropdown .navbar-link {
    padding: 0.75rem 1rem !important;
  }

  #app .navbar-dropdown {
    padding: 0 !important;
    border-top: 1px solid var(--hover-color) !important;
  }

  #app .navbar-dropdown .navbar-item {
    padding: 0.75rem 1.5rem !important;
  }
}

#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.footer {
  margin-top: auto;
  /* background-color: var(--primary-color); */
  padding: 1rem 0;
  font-size: 0.9rem;
}


.footer .copyright {
  margin-bottom: 0.5rem;
}

.footer .links {
  margin-bottom: 0;
}

.navbar-item.custom-nav-item {
  color: #ffffff !important;
  /* 使用纯白色 */
  font-weight: 500;
  /* 稍微加粗 */
}

.navbar-item.custom-nav-item:hover,
.navbar-item.custom-nav-item:focus,
.navbar-item.custom-nav-item.is-active {
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: #ffffff !important;
}

/* 确保在移动��备上也应用这些样式 */
@media screen and (max-width: 1023px) {

  .navbar-item.custom-nav-item,
  .navbar-item.custom-nav-item:hover,
  .navbar-item.custom-nav-item:focus,
  .navbar-item.custom-nav-item.is-active {
    color: #ffffff !important;
    background-color: transparent !important;
  }

  .navbar-item.custom-nav-item:hover,
  .navbar-item.custom-nav-item:focus,
  .navbar-item.custom-nav-item.is-active {
    background-color: rgba(255, 255, 255, 0.2) !important;
  }
}

/* 添加这个新的样式来覆盖可能的默认行为 */
.navbar-item.custom-nav-item.router-link-active {
  background-color: rgba(255, 255, 255, 0.2) !important;
  color: #ffffff !important;
}

/* Add these new styles for the dropdown */
.navbar-item.has-dropdown {
  padding: 0;
}

.navbar-item.has-dropdown .navbar-link {
  padding: 1rem;
  /* 与其他导航项保持一致 */
  color: var(--nav-text-color);
  /* 确保颜色一致 */
}

.navbar-dropdown {
  padding-top: 0;
  padding-bottom: 0;
}

.navbar-dropdown .navbar-item {
  padding: 0.75rem 1.5rem;
}

/* 添加这个新样式来处理下拉菜单的激活状态 */
.navbar-item.has-dropdown:hover .navbar-link,
.navbar-item.has-dropdown.is-active .navbar-link {
  background-color: var(--hover-color);
  color: var(--text-color);
}

/* 确保下拉菜单在激活状态下保持正确的样式 */
.navbar-item.has-dropdown.is-active .navbar-dropdown {
  display: block;
}

/* 添加这个样式来处理下拉菜单项的激活状态 */
.navbar-dropdown .navbar-item.is-active {
  background-color: var(--active-color);
  color: var(--text-color);
}

/* 下拉菜单样式 */
.navbar-dropdown.custom-dropdown {
  background-color: var(--primary-color) !important;
  border-top: none !important;
  border-radius: 0 0 4px 4px !important;
  padding: 0.5rem 0 !important;
  box-shadow: 0 8px 16px rgba(10, 10, 10, 0.1) !important;
}

.navbar-dropdown.custom-dropdown .navbar-item {
  color: var(--nav-text-color) !important;
  padding: 0.75rem 1.5rem !important;
}

.navbar-dropdown.custom-dropdown .navbar-item:hover {
  background-color: var(--hover-color) !important;
  color: var(--text-color) !important;
}

/* 调整 More 下拉菜单的样式 */
.navbar-link:not(.is-arrowless) {
  padding-right: 2.5em;
}

.navbar-link:not(.is-arrowless)::after {
  border-color: var(--nav-text-color);
  right: 1.125em;
  top: 50%;
  transform: translateY(-50%);
}

/* 确保下拉图标在悬停时也可见 */
.navbar-item.has-dropdown:hover .navbar-link::after,
.navbar-item.has-dropdown.is-active .navbar-link::after {
  border-color: var(--text-color);
}

/* 调整 More 按钮的内边距，为图标留出空间 */
.navbar-item.has-dropdown .navbar-link {
  padding-right: 2.5em !important;
}

/* Add these new styles */
.navbar-burger span {
  background-color: var(--text-color);
}

.navbar-brand {
  align-items: center;
}

/* 修改汉堡菜单按钮样式 */
#app .navbar-burger {
  color: var(--text-color) !important;
  height: 4rem;
  display: flex;
  align-items: center;
}

#app .navbar-burger span {
  background-color: var(--text-color) !important;
  height: 2px;
}

#app .navbar-burger:hover {
  background-color: var(--hover-color) !important;
}

/* 确保 navbar-brand 中的元素垂直居中 */
#app .navbar-brand {
  align-items: center;
}

/* 调整 logo 和汉堡菜单按钮的垂直对齐 */
#app .navbar-brand .navbar-item,
#app .navbar-burger {
  display: flex;
  align-items: center;
}

/* 添加这个新样式来处理汉堡菜单按钮的显示 */
@media screen and (min-width: 1024px) {
  .navbar-burger.is-hidden-desktop {
    display: none !important;
  }
}
</style>