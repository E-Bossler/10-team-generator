const path = require("path");
const fs = require("fs");

const templatesDir = path.resolve(__dirname, "../templates");

const render = team => {
  const html = [];

  html.push(team
    .filter(employee => employee.getRole() === "Manager")
    .map(manager => renderManager(manager))
  );
  // console.log('team');
  html.push(team
    .filter(employee => employee.getRole() === "Engineer")
    .map(engineer => renderEngineer(engineer))
  );
  html.push(team
    .filter(employee => employee.getRole() === "Intern")
    .map(intern => renderIntern(intern))
  );
  // console.log('team1');
  return renderMain(html.join(""));
  
};

const renderManager = manager => {
  let template = fs.readFileSync(path.resolve(templatesDir, "manager.html"), "utf8");
  template = replacePlaceholders(template, "name", manager.getName());
  template = replacePlaceholders(template, "jobRole", manager.getRole());
  template = replacePlaceholders(template, "email", manager.getEmail());
  template = replacePlaceholders(template, "gitHub", manager.getGitHub());
  template = replacePlaceholders(template, "roomNumber", manager.getOfficeNumber());
  return template;
};

const renderEngineer = engineer => {
  let template = fs.readFileSync(path.resolve(templatesDir, "engineer.html"), "utf8");
  template = replacePlaceholders(template, "name", engineer.getName());
  template = replacePlaceholders(template, "jobRole", engineer.getRole());
  template = replacePlaceholders(template, "email", engineer.getEmail());
  template = replacePlaceholders(template, "gitHub", engineer.getGitHub());
  template = replacePlaceholders(template, 'portfolio', engineer.getPortfolio());
  return template;
};

const renderIntern = intern => {
  let template = fs.readFileSync(path.resolve(templatesDir, "intern.html"), "utf8");
  template = replacePlaceholders(template, "name", intern.getName());
  template = replacePlaceholders(template, "jobRole", intern.getRole());
  template = replacePlaceholders(template, "email", intern.getEmail());
  template = replacePlaceholders(template, "gitHub", intern.getGitHub());
  template = replacePlaceholders(template, "school", intern.getSchool());
  return template;
};

const renderMain = html => {
  // console.log('hello')
  const template = fs.readFileSync(path.resolve(templatesDir, "main.html"), "utf8");
  // console.log('helloas again')
  return replacePlaceholders(template, "team", html);
};

const replacePlaceholders = (template, placeholder, value) => {
  // console.log('helloas againn and again')

  const pattern = new RegExp("{{ " + placeholder + " }}", "gm");
  // console.log('helloas againn and again and again')
  return template.replace(pattern, value);
};

module.exports = render;
