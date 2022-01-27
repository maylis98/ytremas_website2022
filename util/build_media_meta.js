import fs from "fs";
import path from "path";
import getMediaDimensions from "get-media-dimensions";

let force_meta_rebuild = process.argv.slice(2).includes("--force");

function recursive_search(start_path) {
  let found_files = [];
  let to_explores = [];
  to_explores.push(start_path);
  while (to_explores.length != 0) {
    let current_path = to_explores[0];
    let files = fs.readdirSync(to_explores[0]);
    to_explores.shift(0);
    for (var i = files.length - 1; i >= 0; i--) {
      let file = files[i],
        file_path = path.join(current_path, file),
        is_dir = fs.statSync(file_path).isDirectory();
      if (is_dir) {
        to_explores.push(file_path);
        continue;
      }
      found_files.push({
        name: file,
        path: file_path,
        location_path: current_path
      });
    }
  }
  return found_files;
}

async function set_meta(file_name, file_path, location_path) {
  let file_extension = path.extname(file_name);
  // Get the type of the file (video, image, etc...)
  let file_type = watdat(file_extension);
  // If unknown, skip the file
  if (!file_type) return;
  // Set the destination of the meta file (in the same location as the original file)
  let meta_path = path.join(location_path, file_name + "_meta.json"),
    already_have_meta = fs.existsSync(meta_path);
  // If meta data exist for this file
  // Check if the file is more recent than the meta data
  // If it's more recent, we need to recreate the meta data
  if (
    !force_meta_rebuild &&
    already_have_meta &&
    new Date(fs.statSync(meta_path).mtime) >
    new Date(fs.statSync(file_path).mtime)
  ) return;
  // Fetch the content of the meta data if it already exist
  // The ALT attribute is never overwritten for example
  let meta_data =
    (already_have_meta) ?
    JSON.parse(fs.readFileSync(meta_path, {
      encoding: 'utf8'
    })) : {};
  // Set the media type :)
  meta_data.type = file_type;
  // Get the dimensions of the media
  let mediaInfos = await getMediaDimensions(file_path, file_type);
  meta_data.width = mediaInfos.width;
  meta_data.height = mediaInfos.height;
  meta_data.ratio = mediaInfos.width / mediaInfos.height;
  if(meta_data.type == "video") meta_data.duration = mediaInfos.duration;
  // Add alt attribute if it doesn't exist
  if (meta_data.alt == undefined) meta_data.alt = "";
  meta_data.path = file_path.split("static").pop();
  //
  fs.writeFileSync(meta_path, JSON.stringify(meta_data), (err) => {
    if (err) console.log(err);
  });
  console.log(`${file_name} Updated`);
}

function watdat(extension) {
  extension = extension.replace(".", "").toLowerCase();
  let formats = {
    'video': 'mp4|webm',
    'image': 'png|jpeg|jpg|webp|gif'
  }
  for (var type in formats) {
    let f = new RegExp(formats[type], 'g');
    if (extension.match(f)) return type;
  }
  return false;
}

// Let's go
// root_path is equal to the current path where the script if being executed
// We want to search every files in our static/medias
let root_path = process.cwd(),
  searched_path = path.join(root_path, "static/medias");

let every_files = recursive_search(searched_path);
// recursive_search returns an array of found files
// Each objects has:
// The name of the file
// The path to the file
// The location of the file (the path to its folder)
console.log(`I've found, ${every_files.length} files`);
// Let's loop on all the found files and execut "set_meta" on them
every_files.forEach(file => set_meta(file.name, file.path, file.location_path));
