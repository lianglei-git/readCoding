import fs from "fs";
import path from "path";
const baseProjectCwd = path.resolve(`./test/react_tmpl`);

const paichu = ["node_modules"];

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
            if (paichu.includes(everyFiles)) return;
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
                map[everyFiles] = {
                    file: {
                        contents: fs.readFileSync(everyPath, "utf-8"),
                    },
                };
            }
        });
        return map
    }

     recursion(_targetCwd, _map[dirname].directory = {});
     return _map;
}

// const mm = star(baseProjectCwd);


export default transform_webcontainerFiles;