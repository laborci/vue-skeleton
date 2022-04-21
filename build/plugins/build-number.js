import fs from "fs";
import Path from "path";

class BuildNumber {
	constructor(packageJson = null, key = "build-number") {
		this.key = key;
		this.packageJson = packageJson === null ? Path.resolve(process.cwd(), 'package.json') : packageJson;
	}
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

	write(file, pattern = /\?v=.*?"/g, replace = (version) => "?v=" + version + '"') {
		return {
			writeBundle: () => {
				const packages = JSON.parse(fs.readFileSync(this.packageJson).toString());
				if (!packages.hasOwnProperty(this.key)) packages[this.key] = 0;
				let version = packages[this.key];

				console.log("writing version " + version + " into file: " + file);
				let content;
				if (pattern === null) {
					content = version.toString();
				} else {
					content = fs.readFileSync(file).toString();
					content = content.replaceAll(pattern, replace(version));
				}
				fs.writeFileSync(file, content);
			}
		}
	}
}

export default BuildNumber;