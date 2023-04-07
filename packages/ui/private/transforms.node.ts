import fs from "fs";
import path from "path";

// const baseProjectCwd = path.resolve(`./test/react_tmpl`);

let Exclude = ["node_modules"];

function transform_webcontainerFiles(_targetCwd, _map = {}) {
    const dirname = path.basename (_targetCwd);
    _map[dirname] = {}
    function recursion(targetCwd, map) {
        const files = fs.readdirSync(targetCwd)
        if (!files) {
            console.error(files);
            return;
        }
        files.forEach((everyFiles) => {
            if (Exclude.includes(everyFiles)) return;
            const everyPath = path.resolve(targetCwd, everyFiles);
            const stats = fs.statSync(everyPath)
            if (!stats) {
                console.error(stats);
                return;
            }
            if (stats.isDirectory()) {
                map[everyFiles] = {
                    directory: {}
                }
                recursion(everyPath, map[everyFiles].directory);
            } else {
                let contents = fs.readFileSync(everyPath, "utf-8");                
                map[everyFiles] = {
                    file: { contents: contents/** .replaceAll('process.env.NODE_ENV', '__DEV__') */ }
                };
            }
        });
        return map
    }

     recursion(_targetCwd, _map[dirname].directory = {});
     return _map;
}

transform_webcontainerFiles.setExclude = (k: string[] = []) => {
    Exclude = [...k, ...Exclude]
}



// const mm = star(baseProjectCwd);


export {
    transform_webcontainerFiles
};