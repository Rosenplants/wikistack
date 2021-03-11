const { Router } = require("express");
const html = require("../views/addPage");
const mainHtml = require("../views/main");
const pageHtml = require("../views/wikipage");
const { Page, User } = require("../models");

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const page = await Page.findAll();
    res.send(mainHtml(page));
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res, next) => {
  res.send(html());
});

router.get("/:slug", async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: { slug: req.params.slug },
    });
    res.send(pageHtml(page));
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const page = await Page.create({
      title: req.body.title,
      content: req.body.content,
      slug: req.body.title,
      status: req.body.status,
    });
    const author = await User.findOrCreate({
      where {
        email: req.body.email,
        name: req.body.name,
      }
    })
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
