import fs from "fs";
import Path from "path";

export default class BuildNumber {

	constructor(packageJson = null, key = "build-number") {
		this.key = key;
		this.packageJson = packageJson === null ? Path.resolve(process.cwd(), 'package.json') : packageJson;
		this.buildnumber = Date.now().toString();
	}

	static bump() {return (new BuildNumber()).bump();}
	static replace(file, pattern = /__BUILD_NUMBER__/g, replace = (version) => version.toString()) {return (new BuildNumber()).replace(file, pattern, replace);}
	static write(file) {return (new BuildNumber()).write(file);}
	static touch(file) {return (new BuildNumber()).touch(file);}

	touch(file) {
		return {
			buildEnd: () => {
				const time = new Date();
				try {
					fs.utimesSync(file, time, time);
				} catch (err) {
					fs.closeSync(fs.openSync(file, 'w'));
				}
			}
		}
	}

	bump() {
		return {
			writeBundle: () => {
				const packages = JSON.parse(fs.readFileSync(this.packageJson).toString());
				packages[this.key] = this.buildnumber;
				fs.writeFileSync(this.packageJson, JSON.stringify(packages, null, "\t"));
			}
		}
	}

	replace(file, pattern = /__BUILD_NUMBER__/g, replace = (version) => "?v=" + version + '"') {
		return {
			writeBundle: () => {
				console.log("replce build number (" + this.buildnumber + ") in file: " + file);
				let content = fs.readFileSync(file).toString();
				content = content.replaceAll(pattern, replace(this.buildnumber));
				fs.writeFileSync(file, content);
			}
		}
	}

	write(file) {
		return {
			writeBundle: () => {
				console.log("writing build number (" + this.buildnumber + ") into file: " + file);
				fs.writeFileSync(file, this.buildnumber);
			}
		}
	}
}