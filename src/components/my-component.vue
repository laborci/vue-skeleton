<script setup>
import Counter from "./counter";
import {ref} from "vue";

const count = ref(0)
function increase() {
	count.value++;
}
</script>

<template>
	<div class="card">
		<div class="card-content">
			<div class="content">
				<div class="has-text-centered">Click the button to increase the number</div>
				<Counter :count="count"></Counter>
			</div>
		</div>
		<footer class="card-footer">
			<a class="card-footer-item" @click="increase">Increase</a>
		</footer>
	</div>
</template>

