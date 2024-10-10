<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="container ip-lookup is-fullhd">
        <div class="ip-lookup">
          <h1 class="title">IP Address Lookup</h1>
          <div class="search-bar">
            <input
              class="search-input"
              v-model="query"
              type="text"
              placeholder="请输入要查询的 IP 地址或域名"
              @keyup.enter="redirectToHome"
            />
            <button class="search-button" @click="redirectToHome">查询</button>
          </div>

          <div class="results-container">
            <div class="ip-info-grid">
              <div class="info-card basic-info">
                <h3>国内 IP 地址</h3>
                <p v-if="domesticIpInfo">
                  <strong>IP:</strong> 
                  <router-link :to="{ path: '/ip-information', query: { ip: domesticIpInfo.ip } }" class="ip-link">
                    {{ domesticIpInfo.ip }}
                  </router-link>
                </p>
                <p v-if="domesticIpInfo"><strong>位置:</strong> {{ domesticIpInfo.city }}, {{ domesticIpInfo.country }}</p>
                <p v-if="domesticIpInfo"><strong>运营商:</strong> {{ domesticIpInfo.asn?.name }}</p>
                <button class="refresh-button" @click="lookupDomesticIp" title="刷新本机 IP 地址">
                  <font-awesome-icon icon="sync-alt" />
                </button>
                <font-awesome-icon icon="map-marker-alt" class="background-icon" />
              </div>
              <div class="info-card basic-info">
                <h3>国外 IP 地址</h3>
                <p v-if="foreignIpInfo">
                  <strong>IP:</strong> 
                  <router-link :to="{ path: '/ip-information', query: { ip: foreignIpInfo.ip } }" class="ip-link">
                    {{ foreignIpInfo.ip }}
                  </router-link>
                </p>
                <p v-if="foreignIpInfo"><strong>位置:</strong> {{ foreignIpInfo.city }}, {{ foreignIpInfo.country }}</p>
                <p v-if="foreignIpInfo"><strong>运营商:</strong> {{ foreignIpInfo.asn?.name }}</p>
                <button class="refresh-button" @click="lookupForeignIp" title="刷新国外 IP 地址">
                  <font-awesome-icon icon="sync-alt" />
                </button>
                <font-awesome-icon icon="globe" class="background-icon" />
              </div>
            </div>
          </div>

          <div class="additional-links">
            <a href="#" class="link">查看更多 IP 信息</a>
            <a href="#" class="link">WebRTC Leaks Test</a>
            <a href="#" class="link">DNS Leaks Test</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      query: '',
      domesticIpInfo: null,
      foreignIpInfo: null,
    };
  },
  created() {
    this.lookupDomesticIp();
    this.lookupForeignIp();
  },
  methods: {
    redirectToHome() {
      if (this.query) {
        this.$router.push({ path: '/ip-information', query: { ip: this.query } });
      }
    },
    async lookupDomesticIp() {
      const ip = await this.fetchIpFromCloudflare('https://www.cloudflare-cn.com/cdn-cgi/trace');
      await this.lookupIpInfo(ip, 'domestic');
    },
    async lookupForeignIp() {
      const ip = await this.fetchIpFromCloudflare('https://ip.sb/cdn-cgi/trace');
      await this.lookupIpInfo(ip, 'foreign');
    },
    async fetchIpFromCloudflare(url) {
      try {
        const response = await axios.get(url);
        const lines = response.data.split('\n');
        const ipLine = lines.find(line => line.startsWith('ip='));
        return ipLine ? ipLine.split('=')[1] : null;
      } catch (error) {
        console.error('Error fetching IP from Cloudflare:', error);
        return null;
      }
    },
    async lookupIpInfo(ip, type) {
      try {
        const url = `https://ip.3k.free.hr/api/${ip}`;
        const response = await axios.get(url);
        
        if (response.data.error) {
          console.error('API Error:', response.data.error);
        } else if (response.data.data) {
          const ipInfo = response.data.data;
          ipInfo.asn = ipInfo.asn || {};
          ipInfo.company = ipInfo.company || {};
          ipInfo.carrier = ipInfo.carrier || {};
          ipInfo.privacy = ipInfo.privacy || {};
          ipInfo.abuse = ipInfo.abuse || {};

          if (type === 'domestic') {
            this.domesticIpInfo = ipInfo;
          } else {
            this.foreignIpInfo = ipInfo;
          }
        }
      } catch (error) {
        console.error('Error fetching IP info:', error);
      }
    },
  },
};
</script>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #333;
  text-align: center;
}

.search-bar {
  display: flex;
  margin-bottom: 2rem;
}

.search-input {
  flex-grow: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px 0 0 4px;
}

.search-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  cursor: pointer;
}

.results-container {
  background-color: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.ip-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.info-card {
  background-color: white;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.info-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #444;
}

.info-card p {
  margin-bottom: 0.5rem;
  color: #333;
}

.info-card strong {
  font-weight: bold;
  color: #555;
}

.link {
  color: #007bff;
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.additional-links {
  margin-top: 1rem;
  text-align: center;
}

.additional-links .link {
  margin: 0 0.5rem;
}

.background-icon {
  position: absolute;
  bottom: -30px;
  right: -30px;
  font-size: 10rem;
  opacity: 0.08;
  color: #007bff;
  transform: rotate(-15deg);
}

.refresh-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #f8f9fa;
  color: #007bff;
  border: 1px solid #007bff;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.refresh-button:hover {
  background-color: #007bff;
  color: white;
}

@media (max-width: 768px) {
  .ip-info-grid {
    grid-template-columns: 1fr;
  }
}

.ip-link {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.ip-link:hover {
  color: #0056b3;
  text-decoration: underline;
}
</style>