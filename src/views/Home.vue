<template>
  <div
    class="d-flex flex-column justify-content-center align-items-center min-vh-100"
    style="background-color: #FFF"
  >
    <div class="shadow-lg container-md display__bascula w-75 text-center py-5">
      {{ weight }} {{ unit }}
    </div>

    <div class="bar__progress my-3 w-75">
      <div class="progress" style="height: 2rem">
        <div
          class="progress-bar"
          role="progressbar"
          :style="{ width: progress + '%' }"
          :aria-valuenow="progress"
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {{ progress }}%
        </div>
      </div>
    </div>

    <button @click="getWeight" class="btn btn-success w-25">
      Generar valor aleatorio
    </button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "Bascula",

  computed: {
    ...mapState("bascula", ["weight", "unit", "maxWeight", "minWeight"]),

    progress() {
      return ((this.weight / this.maxWeight) * 100).toFixed(2);
    },
  },

  methods: {
    ...mapActions("bascula", ["getWeight"]),
  },
};
</script>

<style scoped>
.display__bascula {
  background-color: #000000;
  border: 1px solid #e2e2e2;
  border-radius: 0.5rem;
  font-family: "Orbitron", "sans-serif";
  font-weight: bold;
  font-size: 70px;
  color: #23e46d;
}
</style>
