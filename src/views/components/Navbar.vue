<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-black">
    <div class="container">
      <img src="@/assets/LogoESCOM.png" alt="Logo 1" class="img-fluid logo_img" style="width: 200px;">
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'bascula' }"
              >Báscula</router-link
            >
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'sensor-temperatura' }"
              >Temperatura</router-link
            >
          </li>

          <li class="nav-item">
            <router-link class="nav-link" :to="{ name: 'sensor-pulso' }"
              >Pulsómetro</router-link
            >
          </li>

          
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
div a {
  margin: 0 20px;
  text-decoration: none;
  font-weight: bold;
  font-size: 20px;
}

div .router-link-exact-active {
  color: #1472b9;
}
</style>