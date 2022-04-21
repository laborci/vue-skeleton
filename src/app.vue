<script setup>
import MyComponent from "./my-component"

console.log('hello script setup');

let hello = "Hello Vue";
let control = MyComponent;
</script>

<template>
	{{ hello }}!
	<component :is="control"></component>
</template>

<style lang="scss">
@import "bulma/bulma";
@import "bulma-prefers-dark/sass/utilities/_all";
@import "bulma-prefers-dark/sass/base/_all";
@import "bulma-prefers-dark/sass/elements/_all";
@import "bulma-prefers-dark/sass/components/_all";
@import "bulma-prefers-dark/sass/layout/_all";
</style>
