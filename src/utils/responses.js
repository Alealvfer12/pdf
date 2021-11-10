let success = (req, res, message, info, status)=>{
    res.status(status || 200).send({
        ok: true,
        info: info || {},
        message: message,
    });
}

let errorResponse = (req, res, message, info, status)=>{
    console.log(info);
    res.status(status || 500).send({
        ok: false,
        info: info || {},
        message: message,
    });
}

module.exports={success, errorResponse};