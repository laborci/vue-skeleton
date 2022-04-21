import Path from "path";
import commonjs from '@rollup/plugin-commonjs';
import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve';
import {terser} from 'rollup-plugin-terser';
import typescript from "rollup-plugin-typescript2";
import css from 'rollup-plugin-css-only';
import json from "@rollup/plugin-json";
import styles from 'rollup-plugin-styles';
import vue from "rollup-plugin-vue";
import replace from 'rollup-plugin-replace';
import scss from 'rollup-plugin-scss';
import versionBump from "./plugins/version-bump";
import fontCopy from "./plugins/font-copy.js";

const production = !process.env.ROLLUP_WATCH;
const cwd = process.cwd();

export default {
	onwarn: (warning, handler) => warning.code === "PLUGIN_WARNING" ? undefined : handler(warning),
	input: Path.resolve(cwd, 'src/index.ts'),
	output: {
		globals: {vue: 'Vue'},
		file: Path.resolve(cwd, 'dist/index.js'),
		sourcemap: !production,
		format: 'iife'
	},
	plugins: [
		vue({css: false, target: "browser", preprocessStyles: true, preprocessOptions: {sass: {}, scss: {}}}),
		commonjs(),
		json(),
		scss(production ? {outputStyle: "compressed"} : {}),
		alias({entries: {}}),
		typescript({check: false}),
		styles({mode: 'emit', url: false}),
		css({output: "index.css"}),
		resolve({extensions: ['.mjs', '.js', '.json', '.node', ".ts", ".vue"], browser: true}),
		replace({'process.env.NODE_ENV': JSON.stringify('development')}),
		versionBump(Path.resolve(cwd, 'dist/version'), Path.resolve(cwd, 'index.html')),
		production && fontCopy(cwd, Path.resolve(cwd, "dist/fonts")),
		production && terser()
	]
}
