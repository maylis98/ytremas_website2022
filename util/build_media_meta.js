import fs from "fs";
import path from "path";
import image_size from "image-size";

let root_path = process.cwd();
let to_explores = [];
to_explores.push(
  path.join(root_path, "static/medias")
);

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
    set_meta(file, file_path, current_path);
  }
}

function set_meta(file_name, file_path, location_path) {
  let file_extension = path.extname(file_name);
  let file_type = watdat(file_extension);
  if (!file_type) return;
  let meta_path = path.join(location_path, file_name + "_meta.json"),
    already_have_meta = fs.existsSync(meta_path);
  if (
    already_have_meta &&
    new Date(fs.statSync(meta_path).mtime) >
    new Date(fs.statSync(file_path).mtime)
  ) return;

  let meta_data =
    (already_have_meta) ?
    JSON.parse(fs.readFileSync(meta_path, {
      encoding: 'utf8'
    })) : {};
  let {
    width,
    height
  } = image_size(file_path);
  meta_data = {
    ...meta_data,
    width,
    height,
    ratio:width/height
  };
  if (meta_data.alt == undefined) meta_data.alt = "";
  meta_data.path = file_path.split("static").pop();
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
