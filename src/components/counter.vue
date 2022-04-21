<script setup>
const props = defineProps(['count'])
</script>

<template>
	<div class="is-size-1 has-text-centered"><i class="fas fa-hand-paper"></i> {{ count }}</div>
</template>

<style lang="scss" scoped>
div {
	font-family: "Baloo Da 2", serif;
	color: limegreen;
}
</style>
