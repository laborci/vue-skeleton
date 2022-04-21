import fs from "fs";
import Path from "path";

export default class BuildNumber {

	constructor(packageJson = null, key = "build-number") {
		this.key = key;
		this.packageJson = packageJson === null ? Path.resolve(process.cwd(), 'package.json') : packageJson;
	}

	static bump(){return (new BuildNumber()).bump();}
	static replace(file, pattern = /\?v=.*?"/g, replace = (version) => "?v=" + version + '"'){return (new BuildNumber()).replace(file, pattern, replace);}
	static write(file){return (new BuildNumber()).write(file);}

	bump() {
		return {
			writeBundle: () => {
				const packages = JSON.parse(fs.readFileSync(this.packageJson).toString());
				if (!packages.hasOwnProperty(this.key)) packages[this.key] = 0;
				packages[this.key]++;
				fs.writeFileSync(this.packageJson, JSON.stringify(packages, null, "\t"));
			}
		}
	}

	replace(file, pattern = /\?v=.*?"/g, replace = (version) => "?v=" + version + '"') {
		return {
			writeBundle: () => {
				const packages = JSON.parse(fs.readFileSync(this.packageJson).toString());
				if (!packages.hasOwnProperty(this.key)) packages[this.key] = 0;
				let version = packages[this.key].toString();
				console.log("replce build number (" + version + ") in file: " + file);

				let content = fs.readFileSync(file).toString();
				content = content.replaceAll(pattern, replace(version));

				fs.writeFileSync(file, content);
			}
		}
	}

	write(file) {
		return {
			writeBundle: () => {
				const packages = JSON.parse(fs.readFileSync(this.packageJson).toString());
				if (!packages.hasOwnProperty(this.key)) packages[this.key] = 0;
				let version = packages[this.key].toString();
				console.log("writing build number (" + version + ") into file: " + file);
				fs.writeFileSync(file, version);
			}
		}
	}
}