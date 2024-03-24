import Usuario from "../models/usuarios.js"
import mongoose from "mongoose";


const login = async(req,res)=>{
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const usuarioBDD = await Usuario.findOne({email})
    if(!usuarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    const verificarPassword = await usuarioBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password no es el correcto"})
		const {nombre,apellido,direccion,telefono,_id} = usuarioBDD
    res.status(200).json({
        nombre,
        apellido,
        direccion,
        telefono,
        _id,
        email:usuarioBDD.email
    })
}

const perfil =(req,res)=>{
    delete req.usuarioBDD.confirmEmail
    delete req.usuarioBDD.createdAt
    delete req.usuarioBDD.updatedAt
    delete req.usuarioBDD.__v
    res.status(200).json(req.usuarioBDD)
}
const registro = async (req, res) => {
    const { email, password, nombre, apellido } = req.body;
    // Verificar si algún campo está vacío
    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }
    // Verificar si el email ya está registrado
    const verificarEmailBDD = await Usuario.findOne({ email });
    if (verificarEmailBDD) {
        return res.status(400).json({ msg: "Lo sentimos, el email ya se encuentra registrado" });
    }
    // Verificar si nombre y apellido están presentes
    if (!nombre || !apellido) {
        return res.status(400).json({ msg: "Lo sentimos, debes proporcionar nombre y apellido" });
    }
    // Crear nuevo usuario
    const nuevousuario = new Usuario(req.body);
    nuevousuario.password = await nuevousuario.encrypPassword(password);
    await nuevousuario.save();
    // Enviar respuesta de éxito
    res.status(200).json({ msg: "Usuario registrado exitosamente" });
}

const listarUsuarios = async (req,res)=>{

    const usuarioBDD = await Usuario.find({})
    const usuarioBDDList = usuarioBDD.map((usuarios) =>{
        
	    const {email,nombre,apellido,_id} = usuarios
        
	    return {email,nombre,apellido,_id}
    })

    res.status(200).json(usuarioBDDList)

}

const actualizarPerfil = async (req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const usuarioBDD = await Usuario.findById(id)
    if(!usuarioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el Usuario ${id}`})
    if (usuarioBDD.email !=  req.body.email)
    {
        const usuarioBDDMail = await Usuario.findOne({email:req.body.email})
        if (usuarioBDDMail)
        {
            return res.status(404).json({msg:`Lo sentimos, el existe ya se encuentra registrado`})  
        }
    }
	usuarioBDD.nombre = req.body.nombre || usuarioBDD?.nombre
    usuarioBDD.apellido = req.body.apellido  || usuarioBDD?.apellido
    usuarioBDD.direccion = req.body.direccion ||  usuarioBDD?.direccion
    usuarioBDD.telefono = req.body.telefono || usuarioBDD?.telefono
    usuarioBDD.email = req.body.email || usuarioBDD?.email
    await usuarioBDD.save()
    res.status(200).json({msg:"Perfil actualizado correctamente"})
}
const actualizarPassword = async (req,res)=>{
    const usuarioBDD = await Usuario.findById(req.usuarioBDD._id)
    if(!usuarioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el Usuario ${id}`})
    const verificarPassword = await usuarioBDD.matchPassword(req.body.passwordactual)
    if(!verificarPassword) return res.status(404).json({msg:"Lo sentimos, el password actual no es el correcto"})
    usuarioBDD.password = await usuarioBDD.encrypPassword(req.body.passwordnuevo)
    await usuarioBDD.save()
    res.status(200).json({msg:"Password actualizado correctamente"})
}

const recuperarPassword = async(req,res)=>{
    const {email} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const usuarioBDD = await Usuario.findOne({email})
    if(!usuarioBDD) return res.status(404).json({msg:"Lo sentimos, el usuario no se encuentra registrado"})
    await usuarioBDD.save()
    res.status(200).json({msg:"Revisa tu correo electrónico para reestablecer tu cuenta"})
}



const nuevoPassword = async (req,res)=>{
    const{password,confirmpassword} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if(password != confirmpassword) return res.status(404).json({msg:"Lo sentimos, los passwords no coinciden"})
    usuarioBDD.password = await usuarioBDD.encrypPassword(password)
    await usuarioBDD.save()
    res.status(200).json({msg:"Felicitaciones, ya puedes iniciar sesión con tu nuevo password"}) 
}

const detalleUsuarios = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, debe ser un id válido`});
    const usuarioBDD = await Usuario.findById(id).select("-password")
    if(!usuarioBDD) return res.status(404).json({msg:`Lo sentimos, no existe el Usuario ${id}`})
    res.status(200).json({msg:usuarioBDD})
}

export {
    login,
    perfil,
    registro,
    listarUsuarios,
    detalleUsuarios,
    actualizarPerfil,
    actualizarPassword,
	recuperarPassword,
	nuevoPassword
}


