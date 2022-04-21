<script setup>
import MyComponent from "./components/my-component"

let control = MyComponent;
</script>

<template>
	<div class="container">
		<component :is="control"></component>
	</div>
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
//@import "bulma-prefers-dark/sass/utilities/_all";
//@import "bulma-prefers-dark/sass/base/_all";
//@import "bulma-prefers-dark/sass/elements/_all";
//@import "bulma-prefers-dark/sass/components/_all";
//@import "bulma-prefers-dark/sass/layout/_all";
body, html{
	min-height: 100vh;
}
body{
	padding: 30px;
	background-color: #2b74b1;
}
</style>
