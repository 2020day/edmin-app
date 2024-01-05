<template>
  <div class="card">
    <my-card></my-card>

    <v-echare></v-echare>
  </div>
</template>

<script>
import myCard from '../function/myCard.vue';
import VEchare from '../function/v-echare.vue';

export default {
  components: { myCard, VEchare },
};
</script>

<style></style>
