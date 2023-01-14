const express = require('express')
const router = express.Router() 

const { getAllJewelry, getJewelFiltered } = require("../controllers/jewelersControllers")
const { reportRequest } = require("../middleware/logger")

router.get("/joyas",reportRequest, getAllJewelry);
router.get("/joyas/filtros",reportRequest, getJewelFiltered)

router.get('*', (req, res) => {
    res.status(404).send("Esta ruta no existe")
})


module.exports = router
