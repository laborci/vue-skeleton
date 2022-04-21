<script setup>
import {ref} from "vue";

const count = ref(0)
function increase(e) {
	console.log(e)
	count.value++;
}
</script>

<template>
	<div>Click the button to increase the number</div>
	<div><i class="fas fa-hand-paper"></i> {{ count }}</div>
	<button class="button" @click="(e)=>increase(e)">Increase</button>
</template>

<style lang="scss" scoped>
div {
	font-family: "Baloo Da 2", serif;
	color: red;
}
</style>
