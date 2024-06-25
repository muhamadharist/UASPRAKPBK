<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="text-white" style="background-color: #1E2A38;">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <h3 style="font-family: 'Roboto Slab', serif; color: white; font-weight: 700;">Weather Today</h3>
        </q-toolbar-title>
        
        <!-- q-btn-dropdown for Tugas 1-7 -->
        <q-btn-dropdown
          flat
          dense
          color="white"
          icon="menu"
          label="Tugas 1-6"
          class="q-ml-auto"
          style="color: white;"
        >
          <q-list>
            <q-item v-for="(tugas, index) in tugasLinks" :key="index" clickable v-ripple @click="goToLink(tugas.link)">
              <q-item-section>
                <q-item-label>{{ tugas.name }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="weather">
        <h1 class="weather-title">Get Current Weather</h1>
        <form @submit.prevent="fetchWeather">
          <input v-model="city" placeholder="Enter city name" required class="weather-input" />
          <button type="submit" class="weather-button">Get Weather</button>
        </form>
        <div v-if="loading" class="loading">Loading...</div>
        <div v-if="error" class="error">{{ error }}</div>
        
        <!-- Kotak Hasil Cuaca -->
        <div v-if="weather && !error" class="weather-box">
          <h4 class="weather-data">{{ weather.name }}</h4>
          <p class="weather-data">Temperature: {{ (weather.main.temp - 273.15).toFixed(2) }} °C</p>
          <p class="weather-data">Weather: {{ weather.weather[0].description }}</p>
          <p class="weather-data">Humidity: {{ weather.main.humidity }}%</p>
          <p class="weather-data">Wind Speed: {{ weather.wind.speed }} m/s</p>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      city: '',
      weather: null,
      loading: false,
      error: null,
      apiKey: '2e654253096d24edabbd2498fdf6489d', // Ganti dengan API key Anda dari OpenWeatherMap
      tugasLinks: [
        { name: 'Tugas 1', link: 'https://muhamadharist.netlify.app/' },
        { name: 'Tugas 2', link: 'https://loquacious-banoffee-0be42c.netlify.app/' },
        { name: 'Tugas 3', link: 'https://muhamadharistsamudradililla-pbk.netlify.app/' },
        { name: 'Tugas 4', link: 'https://m-harist-samudra-d-ililla-tugas4prak-pbk.vercel.app/' },
        { name: 'Tugas 6', link: 'https://tugas6-parak-pbk.vercel.app/' },
      ],
    };
  },
  methods: {
    async fetchWeather() {
      if (this.city) {
        this.loading = true;
        this.error = null;
        this.weather = null;
        try {
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`
          );
          this.weather = response.data;
        } catch (error) {
          if (error.response && error.response.status === 404) {
            this.error = "City not found. Please try again.";
          } else {
            this.error = "An error occurred while fetching the weather data.";
          }
        } finally {
          this.loading = false;
        }
      }
    },
    goToLink(link) {
      window.open(link, '_blank');
    },
  },
};
</script>

<style scoped>
.weather {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: linear-gradient(135deg, #1E2A38 0%, #3A506B 100%);
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Roboto Slab', serif;
  color: white;
}

.weather-title {
  text-transform: uppercase;
  font-size: 2rem;
  margin-bottom: 20px;
  color: white;
}

form {
  margin-bottom: 20px;
  text-align: center;
}

.weather-input {
  padding: 10px;
  font-size: 1.2rem;
  margin-right: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Roboto Slab', serif;
  background-color: white;
}

.weather-button {
  padding: 10px;
  font-size: 1.2rem;
  background-color: #1E2A38;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-family: 'Roboto Slab', serif;
  transition: background-color 0.3s;
}

.weather-button:hover {
  background-color: #3A506B;
}

.loading {
  color: #4A90E2;
  font-family: 'Roboto Slab', serif;
}

.weather-box {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.weather-data {
  color: white;
  font-family: 'Roboto Slab', serif;
  font-size: 1.5rem;
  margin: 5px 0;
}

.error {
  color: red;
}

.text-center {
  text-align: center;
}
</style>
