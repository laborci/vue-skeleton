import fs from "fs";
import path from "path";

export default function versionBump(filename, files = [], pattern = /\?v=.*?"/g, replace=(version)=>"?v="+version+'"') {
	return {
		writeBundle() {
			fs.mkdirSync(path.dirname(filename), { recursive: true });
			let version = fs.existsSync(filename) ? parseInt(fs.readFileSync(filename)) + 1 : 1;
			fs.writeFileSync(filename, version.toString());
			console.log("Build number: " + version + ' (' + filename + ')');
			if(typeof files === "string") files = [files];
			for(let file of files){
				let content = fs.readFileSync(file).toString();
				content = content.replaceAll(pattern, replace(version));
				fs.writeFileSync(file, content);
			}
		}
	}
}
