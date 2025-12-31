const Article = require('../models/Article');

exports.getAll = async (req, res) => {
  res.json(await Article.find().sort({ createdAt: -1 }));
};

exports.getOne = async (req, res) => {
  res.json(await Article.findById(req.params.id));
};

exports.create = async (req, res) => {
  res.json(await Article.create(req.body));
};

exports.update = async (req, res) => {
  res.json(await Article.findByIdAndUpdate(req.params.id, req.body, { new: true }));
};

exports.remove = async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.json({ deleted: true });
};
