const { getJewelry, getJewelSearch  } = require("../models/jewerlersModels");

  const getAllJewelry = async (req, res) => {
    try {
      const queryString = req.query;
      const joyas = await getJewelry(queryString);
      const HATEOAS = await prepararHATEOAS(joyas);
      res.json(HATEOAS);
    } catch (e) {
      console.log(e);
      res
      .status(400)
      .json({message:"Error al obtener los datos solicitados"});
      }
    };

  const getJewelFiltered= async (req, res) => {
  try {
    const queryString = req.query;
    const joyas = await getJewelSearch(queryString);
    res.json(joyas);
  } catch (e) {
    console.log(e);
    res
    .status(400)
    .json({message:"Error al obtener los datos solicitados "});
    }
  };

const prepararHATEOAS = (joyas) => {
  const results = joyas.map((j) => {
    return {
      name: j.nombre,
      href: `joyas/joya/${j.id}`,
    }
  });
  const totalJoyas = joyas.length
  const totalStock =  joyas.reduce((total, j) => total + j.stock, 0);
  const HATEOAS = {
    totalJoyas,
    totalStock,
    results
  }

  return HATEOAS;
};
  module.exports = { getAllJewelry, prepararHATEOAS, getJewelFiltered };
