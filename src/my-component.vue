<script setup>
import {ref} from "vue";

const count = ref(0)
function inc() { count.value++;}
</script>

<template>
	<div>Click the button to increase the number</div>
	<div> {{ count }}</div>
	<button class="button" @click="inc">Increase</button>
</template>

<style lang="scss" scoped>
div{
	color:red;
}
</style>
