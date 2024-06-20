<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="text-white" style="background-color: #26355D;">
      <q-toolbar>
        <q-toolbar-title class="text-center">
          <h3 style="font-family: Calibri, 'Segoe UI', Arial, sans-serif; color: white; font-weight: 700;">Weather Today</h3>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="weather">
        <h1 class="weather-title"></h1>
        <form @submit.prevent="fetchWeather">
          <input v-model="city" placeholder="Enter city name" required style="font-size: 1.5rem; padding: 6px; font-family: Calibri, 'Segoe UI', Arial, sans-serif;" />
          <button type="submit" style="font-size: 1.5rem; padding: 6px;">Get Weather</button>
        </form>
        <div v-if="loading" style="color: white; font-family: Calibri, 'Segoe UI', Arial, sans-serif;">Loading...</div>
        <div v-if="error" class="error" style="color: red; font-family: Calibri, 'Segoe UI', Arial, sans-serif;">{{ error }}</div>
        
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
  background-image: url('/raisa.jpg'); /* Ubah path ke gambar */
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  padding: 20px;
  box-sizing: border-box;
  font-family: Calibri, 'Segoe UI', Arial, sans-serif;
}

.weather-title {
  text-transform: uppercase;
  font-size: 2.5rem;
  margin-bottom: 20px;
  color: white;
}

form {
  margin-bottom: 20px;
  text-align: center;
}

input {
  padding: 6px;
  font-size: 1.5rem;
  margin-right: 10px;
  border: 1px solid rgb(243, 234, 234);
  border-radius: 4px;
}

button {
  padding: 6px;
  font-size: 1.5rem;
  background-color: #42aee4;
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.weather div {
  margin-top: 20px;
}

.weather-box {
  background-color: rgba(255, 255, 255, 0.3);
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}

.weather-data {
  color: #26355D;
  font-family: Calibri, 'Segoe UI', Arial, sans-serif;
  font-size: 1.8rem;
  margin: 5px 0;
}

.error {
  color: red;
}

.text-center {
  text-align: center;
}
</style>
