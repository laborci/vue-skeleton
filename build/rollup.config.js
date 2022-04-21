import Path from "path";
import alias from "rollup-plugin-alias";
import commonjs from "rollup-plugin-commonjs";
import css from "rollup-plugin-css-only";
import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import scss from "rollup-plugin-scss";
import styles from "rollup-plugin-styles";
import {terser} from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue";
import fontCopy from "./plugins/font-copy";
import BuildNumber from "./plugins/build-number";

const production = !process.env.ROLLUP_WATCH;
const cwd = process.cwd();
const buildNumber = new BuildNumber();

export default {
	input: Path.resolve(cwd, "src/index.ts"),
	output: {
		globals: {vue: "Vue"},
		file: Path.resolve(cwd, "dist/index.js"),
		sourcemap: !production,
		format: "iife"
	},
	plugins: [
		vue({css: false, target: "browser", preprocessStyles: true, preprocessOptions: {sass: {}, scss: {}}}),
		commonjs(),
		json(),
		scss(production ? {outputStyle: "compressed"} : {}),
		alias({entries: {}}),
		typescript({check: false}),
		styles({mode: "emit", url: false}),
		css({output: "index.css"}),
		resolve({extensions: [".mjs", ".js", ".json", ".node", ".ts", ".vue"], browser: true}),
		replace({"process.env.NODE_ENV": JSON.stringify("development")}),
		buildNumber.bump(),
		buildNumber.write(Path.resolve(cwd, "index.html")),
		buildNumber.write(Path.resolve(cwd, "dist/version"), null),
		production && fontCopy(Path.resolve(cwd, "dist/fonts")),
		production && terser()
	]
}
