const {BovinosDAO} = require('../DAO/bovinos'); 
const _bovinosDAO = new BovinosDAO;
const {generarQR} = require('../../utils/qrcode');


class BovinosController {


 /**
  * @description Se toma el parametro con la información del bovino y se valida:
  *  - Que no sea vacio.
  *  - Que contenga la chapeta, tipo bovino.
  * @param {Object} bovino 
  */
   validarBovino(bovino){
    if (!bovino){
        throw{
            ok: false,
            mensaje: 'Ingrese la información del bovino'
        };
    }else if(!bovino.chapeta){
        throw{
            ok: false,
            mensaje: 'Ingrese la información del bovino'
        };
    }else if(!bovino.id_tipo){
        throw{
            ok: false,
            mensaje: 'Ingrese la información del bovino'
        };
    }
};

   async consultarBovinos(){
    let resp = await _bovinosDAO.consultarBovinos();
    return resp.rows;
      
    }

    async consultarBovinosQR(){
        let resp = await _bovinosDAO.consultarBovinosQR();
        return resp.rows;
          
        }
    
    async consultarBovinosCh(){
        let resp = await _bovinosDAO.consultarBovinosQR();
        return resp.rows;
              
        }

    async consultarBovino(id_tipo,chapeta){

        let resp = await _bovinosDAO.consultarBovino(id_tipo,chapeta);

        switch (resp.rowCount ) {
            
            case 0:
                
               throw 'Elemento no encontrado';

            case 1:
                return resp.rows;

        }

    }

   
    async consultarNovillonasyLactantes(){
        let resp = await _bovinosDAO.consultarNovillonasyLactantes();
        return resp.rows;
    }

    async guardarBovino(bovino){
        bovino.qr_code = await generarQR(`${bovino.chapeta}`);
        console.log(bovino.qr_code);
        await _bovinosDAO.guardarBovino(bovino);
    }
  
    

    async editarBovino(bovino,chapeta){
        if (bovino.chapeta != chapeta) {
            throw {
              ok: false,
              mensaje: "chapeta del bovino no corresponde al enviado",
            };
          }
         await _bovinosDAO.editarBovino(bovino);
    }


    async orquestarConsulta( id_tipo, consulta){
        let resp;
        switch (consulta) {
            case 'chapeta':
                resp = await _bovinosDAO.consultarChapeta(id_tipo); 
                return  resp.rows;            
          

            case 'id_tipo': 
                resp =  await _bovinosDAO.consultarPorTipo(id_tipo);        
                return resp.rows;  
             
              

            case 'chapetaNombre':
                resp = await _bovinosDAO.consultarPorTipoEspecifico(id_tipo);  
                return  resp.rows;  
        
            default:

              throw 'No encontrado';
          }
          
    }

    async eliminarBovino(chapeta){
        return _bovinosDAO.eliminarBovino(chapeta);
    }
  
}
module.exports={BovinosController}