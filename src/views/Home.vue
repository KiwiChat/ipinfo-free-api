<template>
  <div class="page-container">
    <div class="content-wrapper">
      <div class="container ip-lookup is-fullhd">
        <div class="ip-lookup">
          <h1 class="title">IP Address Lookup</h1>
          <div class="search-bar">
            <input class="search-input" v-model="ipAddress" type="text" placeholder="Enter IP Address"
              @keyup.enter="lookupIpAddress" />
            <button class="search-button" @click="lookupIpAddress">Lookup</button>
          </div>

          <div v-if="error" class="error-message">
            {{ error }}
          </div>

          <div v-if="ipInfo" class="results-container">
            <h2 class="subtitle">IP Information</h2>
            <div class="ip-info-grid">
              <div class="info-card basic-info">
                <h3>Basic Information</h3>
                <p><strong>IP Address:</strong> {{ ipInfo.ip }}</p>
                <p><strong>Location:</strong> {{ ipInfo.city ?? 'N/A' }}, {{ ipInfo.region ?? 'N/A' }}, {{ ipInfo.country ?? 'N/A' }}</p>
                <p><strong>Coordinates:</strong> {{ ipInfo.loc ?? 'N/A' }}</p>
                <p><strong>Timezone:</strong> {{ ipInfo.timezone ?? 'N/A' }}</p>
                <p><strong>Postal Code:</strong> {{ ipInfo.postal ?? 'N/A' }}</p>
                <i class="fas fa-info-circle background-icon"></i>
              </div>
              <div class="info-card network-info">
                <h3>Network Information</h3>
                <p><strong>ASN: </strong>  
                  <router-link v-if="ipInfo.asn?.asn" :to="{ path: '/asn-lookup', query: { asn: ipInfo.asn.asn } }">
                     {{ ipInfo.asn.asn }}
                  </router-link>
                  <span v-else>N/A</span>
                </p>
                <p><strong>ISP:</strong> {{ ipInfo.asn?.name ?? 'N/A' }}</p>
                <p><strong>Domain:</strong> {{ ipInfo.asn?.domain ?? 'N/A' }}</p>
                <p><strong>Route:</strong> {{ ipInfo.asn?.route ?? 'N/A' }}</p>
                <p><strong>Type:</strong> {{ ipInfo.asn?.type ?? 'N/A' }}</p>
                <i class="fas fa-network-wired background-icon"></i>
              </div>
              <div class="info-card company-info">
                <h3>Company Information</h3>
                <p><strong>Name:</strong> {{ ipInfo.company?.name ?? 'N/A' }}</p>
                <p><strong>Domain:</strong> {{ ipInfo.company?.domain ?? 'N/A' }}</p>
                <p><strong>Type:</strong> {{ ipInfo.company?.type ?? 'N/A' }}</p>
                <i class="fas fa-building background-icon"></i>
              </div>
              <div class="info-card carrier-info">
                <h3>Carrier Information</h3>
                <p><strong>Name:</strong> {{ ipInfo.carrier?.name ?? 'N/A' }}</p>
                <p><strong>MCC:</strong> {{ ipInfo.carrier?.mcc ?? 'N/A' }}</p>
                <p><strong>MNC:</strong> {{ ipInfo.carrier?.mnc ?? 'N/A' }}</p>
                <i class="fas fa-broadcast-tower background-icon"></i>
              </div>
              <div class="info-card privacy-info">
                <h3>Privacy Information</h3>
                <div class="privacy-content">
                  <div v-for="(value, key) in ipInfo.privacy" :key="key" class="privacy-item">
                    <span class="privacy-label">{{ key.charAt(0).toUpperCase() + key.slice(1) }}:</span>
                    <span :class="['privacy-status', value ? 'active' : 'inactive']">
                      {{ value ? 'Yes' : 'No' }}
                    </span>
                  </div>
                </div>
                <i class="fas fa-user-shield background-icon"></i>
              </div>
              <div class="info-card abuse-info">
                <h3>Abuse Information</h3>
                <p><strong>Name:</strong> {{ ipInfo.abuse?.name ?? 'N/A' }}</p>
                <p><strong>Address:</strong> {{ ipInfo.abuse?.address ?? 'N/A' }}</p>
                <p><strong>Country:</strong> {{ ipInfo.abuse?.country ?? 'N/A' }}</p>
                <p><strong>Email:</strong> {{ ipInfo.abuse?.email ?? 'N/A' }}</p>
                <p><strong>Phone:</strong> {{ ipInfo.abuse?.phone ?? 'N/A' }}</p>
                <p><strong>Network:</strong> {{ ipInfo.abuse?.network ?? 'N/A' }}</p>
                <i class="fas fa-exclamation-triangle background-icon"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

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
  grid-template-columns: repeat(3, 1fr);
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
}

.info-card strong {
  font-weight: bold;
  color: #555;
}

/* 添加响应式布局 */
@media (max-width: 1024px) {
  .ip-info-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .ip-info-grid {
    grid-template-columns: 1fr;
  }
}

/* 为 Privacy Information 添加特殊样式 */
.info-card.privacy-info {
  display: block; /* 改为块级显示 */
}

.privacy-info .privacy-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.privacy-info .privacy-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.privacy-label {
  font-weight: bold;
  color: #555;
}

.privacy-status {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.privacy-status.active {
  background-color: #e74c3c;
  color: #fff;
}

.privacy-status.inactive {
  background-color: #2ecc71;
  color: #fff;
}

/* Add this new style for the ASN link */
.network-info a {
  color: #007bff;
  text-decoration: none;
}

.network-info a:hover {
  text-decoration: underline;
}

.error-message {
  background-color: #f8d7da;
  color: #721c24;
  padding: 1rem;
  margin-bottom: 1rem;
  border: 1px solid #f5c6cb;
  border-radius: 4px;
}

.background-icon {
  position: absolute;
  bottom: -30px;  /* Adjusted from -10px to -30px */
  right: -30px;   /* Adjusted from -10px to -30px */
  font-size: 10rem;  /* Increased from 6rem to 10rem */
  opacity: 0.08;  /* Slightly reduced opacity for better readability */
  color: #007bff;
  transform: rotate(-15deg);
}
</style>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      ipAddress: this.getIpAddressFromCookie() || '',
      ipInfo: null,
      error: null, // Add this line to store error messages
    };
  },
  created() {
    const url = new URL(window.location.href);
    if (url.searchParams.has("ip")) {
      this.ipAddress = url.searchParams.get("ip");
      this.hostname = window.location.hostname;
    }
    this.lookupIpAddress();
  },

  methods: {
    async lookupIpAddress() {
      try {
        this.error = null; // Reset error before making the request
        const url = `https://ip.3k.free.hr/api/${this.ipAddress}`;
        const response = await axios.get(url);
        
        if (response.data.error) {
          // If the API returns an error message
          this.error = response.data.error;
          this.ipInfo = null;
        } else if (response.data.data) {
          this.ipInfo = response.data.data;

          // Ensure all expected objects exist
          this.ipInfo.asn = this.ipInfo.asn || {};
          this.ipInfo.company = this.ipInfo.company || {};
          this.ipInfo.carrier = this.ipInfo.carrier || {};
          this.ipInfo.privacy = this.ipInfo.privacy || {};
          this.ipInfo.abuse = this.ipInfo.abuse || {};

          // Save the entered IP address to the cookie
          this.saveIpAddressToCookie(this.ipAddress);
        } else {
          // If the response doesn't match expected format
          this.error = 'Unexpected response format from the server.';
          this.ipInfo = null;
        }
      } catch (error) {
        console.error('Error fetching IP info:', error);
        this.ipInfo = null;
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          if (error.response.data && error.response.data.error) {
            this.error = error.response.data.error;
          } else {
            this.error = `Server error: ${error.response.status}`;
          }
        } else if (error.request) {
          // The request was made but no response was received
          this.error = 'No response received from the server. Please check your internet connection.';
        } else {
          // Something happened in setting up the request that triggered an Error
          this.error = 'An error occurred while setting up the request. Please try again.';
        }
      }
    },
    saveIpAddressToCookie(ipAddress) {
      const now = new Date();
      now.setFullYear(now.getFullYear() + 1); // Set the cookie expiration to 1 year from now
      document.cookie = `ipAddress=${ipAddress}; expires=${now.toUTCString()}; path=/`;
    },
    getIpAddressFromCookie() {
      const cookie = document.cookie.split('; ').find(row => row.startsWith('ipAddress='));
      if (cookie) {
        return cookie.split('=')[1];
      }
      return null;
    },
  },
};
</script>