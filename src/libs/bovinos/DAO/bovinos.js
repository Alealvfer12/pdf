const config = require('config');
const database = config.get('DB');
const ServicePg = require('../../../database/postgress');
const _servicio = new ServicePg(database);


class BovinosDAO {

/**
 * @description Consulta toda la información de los bovinos en la base de datos.
 * @returns
 */
async consultarBovinos()  {    
    let sql = `SELECT "id_Tbovinos", chapeta, id_tipo, nombre, id_raza, genetica, finca
              FROM public."Bovinos"  where "id_Tbovinos">0
              order by chapeta asc;`;
    let respuesta = await _servicio.executeSQL(sql);
    return respuesta
};

/** BOVINO POR CHAPETA */
async consultarBovinoCh(chapeta)  {    
    let sql = `SELECT "id_Tbovinos", chapeta, "TiposBovinos".id_tipo, "Bovinos".nombre, "Razas".id_raza, genetica, finca
    FROM public."Bovinos"
    inner join public."TiposBovinos" on public."Bovinos".id_tipo = public."TiposBovinos".id_tipo
    inner join public."Razas" on public."Bovinos".id_raza = public."Razas".id_raza
    where chapeta= $1`;
    let respuesta = await _servicio.executeSQL(sql);
    return respuesta
};
/**
 * @description Consulta toda la información de los bovinos en la base de datos con su respectivo qr.
 * @returns
 */
 async consultarBovinosQR()  {    
  let sql = `SELECT "id_Tbovinos", chapeta, id_tipo, nombre, id_raza, genetica, finca, qr_code
            FROM public."Bovinos" `;
  let respuesta = await _servicio.executeSQL(sql);
  return respuesta
};

/**
 * @description Consulta un bovino en específico en la base de datos.
 * @param {int} tipo 
 * @param {int} chapeta 
 * @returns
 */
async consultarBovino(id_tipo,chapeta){   
    let sql = `SELECT "id_Tbovinos", chapeta, id_tipo, nombre, id_raza, genetica, finca
    FROM public."Bovinos" where id_tipo=$1 and chapeta =$2;`;
      
    let respuesta = await _servicio.executeSQL(sql, [id_tipo,chapeta]);
    return respuesta;
  };
  
/**
 * @description Consulta todos los bovinos de un tipo específico.
 * @param {int} tipo  
 * @returns
 */
 async consultarPorTipo(id_tipo) {
    let sql = `SELECT "id_Tbovinos", chapeta, id_tipo, nombre, id_raza, genetica, finca 
            FROM public."Bovinos" WHERE id_tipo = $1
            order by chapeta asc, finca asc, nombre asc;`;    
    let respuesta = await _servicio.executeSQL(sql, [id_tipo]);
    return respuesta;
  }
  /**
 * @description Consulta la chapeta y nombre de los bovinos de un tipo específico.
 * @param {int} tipo  
 * @returns
 */
 async consultarPorTipoEspecifico(id_tipo) {
    let sql = `SELECT chapeta, nombre
              FROM public."Bovinos" where id_tipo=$1
              order by chapeta asc,finca asc, nombre asc;`;
      
    let respuesta = await _servicio.executeSQL(sql, [id_tipo]);
    return respuesta;
  }
  /**
 * @description Consulta las chapetas de los bovinos filtradas por el tipo de bovino.
 * @param {int} tipo 
 * @returns
 */
   async consultarChapeta(id_tipo) {
    let sql = `SELECT  chapeta FROM public."Bovinos" WHERE id_tipo = $1;`;    
    let respuesta = await _servicio.executeSQL(sql, [id_tipo]);
    return respuesta;
  };
  /**
 * @description Conslta las novillonas y lactantes.
 * @param {int} tipo  
 * @returns
 */
 async consultarNovillonasyLactantes() {   
    let sql = `SELECT "id_Tbovinos", chapeta, "TiposBovinos".nombre as tipo,"Bovinos".nombre, id_raza, genetica, finca
              FROM public."Bovinos" 
              inner join public."TiposBovinos" on "Bovinos"."id_tipo" = "TiposBovinos"."id_tipo"
              where "TiposBovinos".id_tipo=3 or "TiposBovinos".id_tipo=8
              order by chapeta asc;`;
      
    let respuesta = await _servicio.executeSQL(sql);
    return respuesta;
  };
  
/**
 * @description Almacena un nuevo bovino en la base de datos.
 * @param {Object} bovino
 * @returns 
 */
async guardarBovino(bovino) {
    let sql = `INSERT INTO public."Bovinos"(chapeta, id_tipo, nombre, id_raza, genetica, finca, qr_code)
                VALUES ($1, $2, $3, $4, $5, $6,$7);`;
    let valores = [bovino.chapeta, bovino.id_tipo, bovino.nombre, bovino.id_raza, bovino.genetica, bovino.finca,bovino.qr_code];
    let respuesta = await _servicio.executeSQL(sql, valores);
    return respuesta
};
/**
 * @description Elimina un bovino de la base de datos.
 * @param {String} chapeta 
 * @returns
 */
 async eliminarBovino(chapeta) {
    let sql = `DELETE FROM public."Bovinos" where chapeta = $1;`;    
    let respuesta = await _servicio.executeSQL(sql, [chapeta]);
    return respuesta
};
  
/**
 * @description Modifica la información de un bovino.
 * @param {Object} bovino 
 * @returns 
 */
 async editarBovino (bovino)  {
    let sql =
      `UPDATE public."Bovinos"
        SET  id_tipo=$1, nombre=$2, id_raza=$3, genetica=$4, finca=$5
        WHERE chapeta = $6;`;
    let valores = [ bovino.id_tipo, bovino.nombre, 
      bovino.id_raza, bovino.genetica, bovino.finca, bovino.chapeta];
     await _servicio.executeSQL(sql, valores);
   
  };
}
module.exports={BovinosDAO}