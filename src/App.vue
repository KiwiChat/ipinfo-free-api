<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="container">
        <div class="navbar-brand">
          <router-link class="navbar-item" to="/">
            <span class="logo">IP<span class="logo-highlight">Lookup</span></span>
          </router-link>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
          <div class="navbar-start">
            <router-link class="navbar-item" to="/ip-information">IP Lookup</router-link>
            <router-link class="navbar-item" to="/asn-lookup">ASN Lookup</router-link>
            <router-link class="navbar-item" to="/api-documentation">Documentation</router-link>
            <router-link class="navbar-item" to="/about-us">About</router-link>
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
  // 移除了 data 和 methods
};
</script>

<style>
:root {
  --primary-color: #1a237e; /* 深蓝色 */
  --secondary-color: #283593; /* 稍浅的蓝色 */
  --accent-color: #00bcd4; /* 青色 */
  --text-color: #ffffff; /* 纯白色 */
  --hover-color: rgba(255, 255, 255, 0.2);
  --active-color: rgba(255, 255, 255, 0.3);
  --logo-gradient-start: #00bcd4; /* 青色 */
  --logo-gradient-end: #4caf50; /* 绿色 */
}

body {
  font-family: 'Arial', sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

.navbar {
  background-color: var(--primary-color);
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

.navbar-item,
.navbar-link {
  color: var(--text-color);
  transition: background-color 0.3s ease;
  padding: 1rem;
}

.navbar-item:hover,
.navbar-link:hover,
.navbar-item.is-active,
.navbar-link.is-active {
  background-color: var(--hover-color);
  color: var(--accent-color);
}

.navbar-dropdown {
  background-color: var(--secondary-color);
  border-top: none;
  border-radius: 0 0 4px 4px;
}

.navbar-dropdown .navbar-item {
  padding: 0.75rem 1rem;
}

.navbar-dropdown .navbar-item:hover {
  background-color: var(--hover-color);
}

.navbar-burger {
  color: var(--text-color);
  height: 4rem;
}

.navbar-burger:hover {
  background-color: var(--hover-color);
}

@media screen and (max-width: 1023px) {
  .navbar-menu {
    background-color: #ffffff;
  }

  .navbar-menu.is-active {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .navbar-item,
  .navbar-link {
    color: var(--primary-color);
  }

  .navbar-item:hover,
  .navbar-link:hover,
  .navbar-item.is-active,
  .navbar-link.is-active {
    background-color: #f5f5f5;
    color: var(--accent-color);
  }

  .navbar-dropdown {
    background-color: #ffffff;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  }

  .navbar-dropdown .navbar-item:hover {
    background-color: #f5f5f5;
  }

  .navbar-burger {
    color: var(--text-color);
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

</style>
