<script setup>
import MyComponent from "./components/my-component"

console.log('hello script setup');

let hello = "Hello Vue";
let control = MyComponent;
</script>

<template>
	{{ hello }}!
	<component :is="control"></component>
</template>

<style lang="scss">
@use "@fontsource/baloo-da-2/scss/mixins" as BalooDa2;

@include BalooDa2.fontFace($fontDir: "fonts/baloo-da-2", $weight: 400);
@include BalooDa2.fontFace($fontDir: "fonts/baloo-da-2", $weight: 800);

@import "@fortawesome/fontawesome-free/scss/variables";
$fa-font-path: "fonts/fontawesome-free";
@import "@fortawesome/fontawesome-free/scss/brands";
@import "@fortawesome/fontawesome-free/scss/solid";
@import "@fortawesome/fontawesome-free/scss/fontawesome";

@import "bulma/bulma";
@import "bulma-prefers-dark/sass/utilities/_all";
@import "bulma-prefers-dark/sass/base/_all";
@import "bulma-prefers-dark/sass/elements/_all";
@import "bulma-prefers-dark/sass/components/_all";
@import "bulma-prefers-dark/sass/layout/_all";



</style>
