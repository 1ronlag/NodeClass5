const pool = require("../db/connectionDb").pool;
const format = require("pg-format");

const getJewelry = async ({ limits = 10, order_by = 'id_ASC', page = 1}) => {
    const [ campo, direccion ] = order_by.split("_");
    const offset = (page - 1)  * limits;
  
    const formattedQuery = format('SELECT * FROM inventario order by %s %s LIMIT %s OFFSET %s', campo, direccion, limits, offset);
    const { rows: joyas, Count } = await pool.query(formattedQuery);
    
    if (Count === 0) {
      throw { code: 404, message: `No se encontraron resultados` };
    };
  
    return joyas;
  };

  const getJewelSearch = async({precio_max,precio_min, categoria, metal }) => {
    let filters = [];
    const values = [];
  
    function addfilter(campo, comparador, valor) {
      values.push(valor);
      const {length} = filters
      filters.push(`${campo} ${comparador} $${length + 1}`) 
    }
    if(precio_max) addfilter('precio', '<=', precio_max);
    if(precio_min) addfilter('precio', '>=', precio_min);
    if(categoria) addfilter('categoria', '=', categoria);
    if(metal) addfilter('metal', '=', metal);
  
    let SQLquery = 'SELECT * FROM inventario';
    if(filters.length > 0) {
        filters = filters.join(' AND ');
        SQLquery += ` WHERE ${filters}`
    };
  
    const { rows: joyas, Count } = await pool.query(SQLquery, values);
  
    if (Count === 0) {
      throw { code: 404, message: `No se encontraron resultados` };
    };
  
    return joyas;
  };

module.exports = {getJewelry, getJewelSearch}
