function slugGenerator(title) {
  return title.replace(/\s+/g, "_").replace(/\W/g, "");
}

module.exports = slugGenerator;
