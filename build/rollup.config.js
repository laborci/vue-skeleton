import Path from "path";
import alias from "rollup-plugin-alias";
import commonjs from "rollup-plugin-commonjs";
import css from "rollup-plugin-css-only";
import copy from "rollup-plugin-copy";
import json from "rollup-plugin-json";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import scss from "rollup-plugin-scss";
import {terser} from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";
import vue from "rollup-plugin-vue";
import fontCopy from "./plugins/font-copy";
import BuildNumber from "./plugins/build-number";

const production = !process.env.ROLLUP_WATCH;
const cwd = process.cwd();

export default {
	input: Path.resolve(cwd, "src/index.ts"),
	output: {
		globals: {vue: "Vue"},
		file: Path.resolve(cwd, "dist/index.js"),
		sourcemap: !production,
		format: "iife"
	},
	plugins: [
		alias({entries: {}}),
		vue({css: false, target: "browser", preprocessStyles: true, preprocessOptions: {sass: {}, scss: {}}}),
		commonjs(),
		typescript({check: false}),
		json(),
		scss({outputStyle: production ? "compressed" : null}),
		css({output: "index.css"}),
		resolve({extensions: [".mjs", ".js", ".json", ".node", ".ts", ".vue"], browser: true}),
		replace({
			"process.env.NODE_ENV": JSON.stringify("development"),
			"__VUE_OPTIONS_API__": JSON.stringify(false),
			"__VUE_PROD_DEVTOOLS__": JSON.stringify(!production),
		}),
		copy({
			targets: [
				{src: Path.resolve(cwd, "src/index.html"), dest: Path.resolve(cwd, "dist")}
			]
		}),
		//BuildNumber.bump(),
		BuildNumber.inject(Path.resolve(cwd, "dist/index.html")),
		BuildNumber.write(Path.resolve(cwd, "dist/version"), null),
		BuildNumber.touch(Path.resolve(cwd, "dist/build"), null),
		production && fontCopy(Path.resolve(cwd, "dist/fonts")),
		production && terser()
	]
}

