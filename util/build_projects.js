import fs from "fs";
import path from "path";
import fm from "front-matter";
import MarkdownIt from "markdown-it";
let md = new MarkdownIt();

let root_path = process.cwd(),
  path_to_projects = path.join(root_path, "static/content/projects");

function get_projects() {
  let project_file_list = fs.readdirSync(path_to_projects);
  let projects = project_file_list.map(project_file_name => {
    let md_file_path = path.join(path_to_projects, project_file_name);
    let raw_content = fs.readFileSync(md_file_path, {
      encoding: 'utf8'
    });
    raw_content = fm(raw_content);
    let content = {
      ...raw_content.attributes,
      slug: path.basename(project_file_name, ".md"),
      body: md.render(raw_content.body)
    };
    if (content.vignette) content.vignette = get_meta(content.vignette);
    if (content.carousel) {
      content.carousel = content.carousel.map(c => get_meta(c));
    };
    return content;
  });
  return projects;
}

function get_meta(image_relative_path) {
  let meta_path = path.join(root_path, `/static/medias/${image_relative_path}_meta.json`);
  return JSON.parse(fs.readFileSync(meta_path, {
    encoding: 'utf8'
  }));
}

let projects = get_projects();

let projects_list = projects.map(project => {
  return {
    title: project.title,
    slug: project.slug,
    vignette: project.vignette
  };
});

fs.writeFileSync(path.join(root_path, "static/data/projects_list.json"), JSON.stringify(projects_list));

let target_path = path.join(root_path, "static/data/projects");
if (fs.existsSync(target_path)) {
  fs.rmSync(target_path, {
    recursive: true
  });
}
fs.mkdirSync(target_path);

projects.forEach(project => {
  fs.writeFileSync(
    path.join(root_path, `static/data/projects/${project.slug}.json`),
    JSON.stringify(project)
  );
});
