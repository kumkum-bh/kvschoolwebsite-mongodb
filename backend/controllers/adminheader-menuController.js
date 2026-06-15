import HeaderMenu from "../models/HeaderMenu.js";

export const getMenu = async (req, res) => {
  const menu = await HeaderMenu.find().sort({ order: 1 });
  res.json({ success: true, menu });
};


export const addMenu = async (req, res) => {
  const item = new HeaderMenu(req.body);
  await item.save();
  res.json({ success: true, message: "Menu Added" });
};

export const updateMenu = async (req, res) => {
  await HeaderMenu.findByIdAndUpdate(req.params.id, req.body);
  res.json({ success: true, message: "Menu Updated" });
};

export const deleteMenu = async (req, res) => {
  await HeaderMenu.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "Menu Deleted" });
};


























































