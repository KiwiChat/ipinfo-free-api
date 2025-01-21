<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="container asn is-fullhd">
        <div class="asn-lookup">
          <h1 class="title">ASN Lookup</h1>
          <div class="search-bar">
            <input class="search-input" v-model="ipAddress" type="text" placeholder="Enter ASN (e.g., AS8966)"
              @keyup.enter="lookupIpAddress" />
            <button class="search-button" @click="lookupIpAddress">Lookup</button>
          </div>

          <div v-if="ipInfo" class="results-container">
            <section class="info-section">
              <h2>ASN Information</h2>
              <div class="info-grid">
                <div v-for="(value, key) in ipInfo" :key="key" class="info-item">
                  <span class="info-label">{{ formatLabel(key) }}</span>
                  <span class="info-value">{{ value }}</span>
                  <font-awesome-icon :icon="getIconClass(key)" class="background-icon" />
                </div>
              </div>
            </section>

            <section class="prefixes-section">
              <h2>IPv4 Prefixes</h2>
              <div class="table-responsive">
                <table v-if="cidrv4 && cidrv4.length">
                  <thead>
                    <tr>
                      <th>
                        Netblock
                        <button @click="copyNetblocks('v4')" class="copy-button" title="Copy IPv4 Netblocks">
                          <font-awesome-icon icon="copy" />
                        </button>
                      </th>
                      <th v-for="header in ['ID', 'Name', 'Country', 'Size', 'Status', 'Domain']" :key="header">{{
                        header }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(prefix, index) in cidrv4" :key="index">
                      <td v-for="key in ['netblock', 'id', 'name', 'country', 'size', 'status', 'domain']" :key="key">
                        {{ prefix[key] }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p v-else>No IPv4 prefixes found.</p>
              </div>
            </section>

            <section class="prefixes-section">
              <h2>IPv6 Prefixes</h2>
              <div class="table-responsive">
                <table v-if="cidrv6 && cidrv6.length">
                  <thead>
                    <tr>
                      <th>
                        Netblock
                        <button @click="copyNetblocks('v6')" class="copy-button" title="Copy IPv6 Netblocks">
                          <font-awesome-icon icon="copy" />
                        </button>
                      </th>
                      <th v-for="header in ['ID', 'Name', 'Country', 'Size', 'Status', 'Domain']" :key="header">{{
                        header }}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(prefix, index) in cidrv6" :key="index">
                      <td v-for="key in ['netblock', 'id', 'name', 'country', 'size', 'status', 'domain']" :key="key">
                        {{ prefix[key] }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <p v-else>No IPv6 prefixes found.</p>
              </div>
            </section>

            <section class="peers-section">
              <h2>Network Relationships</h2>
              <div class="peers-grid">
                <div class="peer-group">
                  <h3>Peers</h3>
                  <ul>
                    <li v-for="peer in peerinfo.peers" :key="peer" @click="lookupAsn(peer.split(' ')[0])"
                      class="asn-item">
                      {{ peer }}
                    </li>
                  </ul>
                </div>
                <div class="peer-group">
                  <h3>Upstreams</h3>
                  <ul>
                    <li v-for="upstream in peerinfo.upstreams" :key="upstream"
                      @click="lookupAsn(upstream.split(' ')[0])" class="asn-item">
                      {{ upstream }}
                    </li>
                  </ul>
                </div>
                <div class="peer-group">
                  <h3>Downstreams</h3>
                  <ul>
                    <li v-for="downstream in peerinfo.downstreams" :key="downstream"
                      @click="lookupAsn(downstream.split(' ')[0])" class="asn-item">
                      {{ downstream }}
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      ipAddress: "",
      ipInfo: null,
      cidrv4: null,
      cidrv6: null,
      peerinfo: null,
    };
  },
  created() {
    this.ipAddress = this.getAsnFromCookie() || "";
    const url = new URL(window.location.href);
    if (url.searchParams.has("asn")) {
      this.ipAddress = url.searchParams.get("asn");
    }
    if (this.ipAddress) {
      this.lookupIpAddress();
    }
  },
  methods: {
    async lookupIpAddress() {
      try {
        const asn = this.ipAddress.toLowerCase().startsWith("as")
          ? this.ipAddress.substring(2)
          : this.ipAddress;
        const url = `https://verificati-ip.pages.dev/api/AS${asn}`;
        const response = await axios.get(url);
        this.ipInfo = {
          asn: response.data.asn,
          name: response.data.name,
          country: response.data.country,
          allocated: response.data.allocated,
          registry: response.data.registry,
          domain: response.data.domain,
          num_ips: response.data.num_ips,
          type: response.data.type,
        };
        this.cidrv4 = response.data.prefixes;
        this.cidrv6 = response.data.prefixes6;
        this.peerinfo = {
          peers: response.data.peers || [],
          upstreams: response.data.upstreams || [],
          downstreams: response.data.downstreams || [],
        };

        // Save the entered ASN to the cookie
        this.saveAsnToCookie(this.ipAddress);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching IP from Cloudflare:', error);
        this.ipInfo = null;
      }
    },
    formatLabel(key) {
      return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    },
    saveAsnToCookie(asn) {
      const now = new Date();
      now.setFullYear(now.getFullYear() + 1); // Set the cookie expiration to 1 year from now
      document.cookie = `lastAsn=${asn}; expires=${now.toUTCString()}; path=/`;
    },
    getAsnFromCookie() {
      const cookie = document.cookie.split('; ').find(row => row.startsWith('lastAsn='));
      if (cookie) {
        return cookie.split('=')[1];
      }
      return null;
    },
    copyNetblocks(version) {
      const prefixes = version === 'v4' ? this.cidrv4 : this.cidrv6;
      const netblocks = prefixes.map(prefix => prefix.netblock).join('\n');
      navigator.clipboard.writeText(netblocks).then(() => {
        alert('Netblocks copied to clipboard!');
      }).catch(err => {
        console.error('Failed to copy netblocks: ', err);
      });
    },
    lookupAsn(asn) {
      this.ipAddress = asn;
      this.lookupIpAddress();
      this.$router.push({ path: '/asn-lookup', query: { asn: asn } });
    },
    getIconClass(key) {
      const iconMap = {
        asn: 'network-wired',
        name: 'building',
        country: 'globe',
        allocated: 'calendar-alt',
        registry: 'database',
        domain: 'globe-americas',
        num_ips: 'server',
        type: 'info-circle'
      };
      return iconMap[key] || 'question';
    }
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

.info-section,
.prefixes-section,
.peers-section {
  margin-bottom: 2rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.info-item {
  background-color: white;
  padding: 1rem;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.info-label {
  font-weight: bold;
  color: #555;
  display: block;
  margin-bottom: 0.5rem;
}

.info-value {
  color: #333;
}

.table-responsive {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: white;
}

th,
td {
  padding: 0.75rem;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

th {
  background-color: #f1f3f5;
  font-weight: bold;
  color: #333;
}

.peers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.peer-group h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #444;
}

.peer-group ul {
  list-style-type: none;
  padding: 0;
}

.peer-group li {
  background-color: white;
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.copy-button {
  font-size: 0.8rem;
  background-color: transparent;
  color: #007bff;
  border: none;
  cursor: pointer;
  transition: color 0.3s ease;
}

.copy-button:hover {
  color: #0056b3;
}

/* 如果您想要一个圆形背景的按钮，可以使用以下样式 */
/*
.copy-button {
  margin-left: 0.5rem;
  width: 24px;
  height: 24px;
  font-size: 0.8rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s ease;
}

.copy-button:hover {
  background-color: #0056b3;
}
*/

.peer-group a {
  color: #007bff;
  text-decoration: none;
  transition: color 0.3s ease;
}

.peer-group a:hover {
  color: #0056b3;
  text-decoration: underline;
}

.asn-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.asn-button:hover {
  background-color: #0056b3;
}

.asn-item {
  cursor: pointer;
  padding: 0.5rem;
  transition: background-color 0.3s ease;
}

.asn-item:hover {
  background-color: #f0f0f0;
}

.peer-group ul {
  list-style-type: none;
  padding: 0;
}

.peer-group li {
  background-color: white;
  margin-bottom: 0.5rem;
  border-radius: 4px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.background-icon {
  position: absolute;
  bottom: -10px;
  right: -10px;
  font-size: 4rem;
  opacity: 0.1;
  color: #007bff;
  transform: rotate(-15deg);
}
</style>
