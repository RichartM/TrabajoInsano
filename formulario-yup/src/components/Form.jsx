import React from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import "../styles/Form.css"; 

export default function Form() {

    const schema = yup.object().shape({
        name: yup.string().required("El nombre es requerido"),
        lastName: yup.string().required("El apellido paterno es requerido"),
        surName: yup.string().required("El apellido materno es requerido"),
        email: yup.string().required("El correo es requerido").email("Formato de email incorrecto"),
        age: yup.number().required("La edad es requeridad").integer("Debes ingresar un numero entero").min(18, "La edad minima debe ser 18").typeError(""),
        phone: yup.number().required("El numero de telefono es requerido").integer("Solo se pueden agregar numeros enteros").min(10, "Se necesitan minimo 10 numeros").typeError(""),
        pass:yup.string().required("La contraseña es obligatoria").min(4, "Se necesitan minimo 4 caracteres").max(10, "Maximo 10 caracteres"),
        confirmPass: yup.string().oneOf([yup.ref("pass"), null], "La contraseña debe coincidir")
        
    })


    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })
    function onSubmit(data){
        console.log(data) 
    }
    //apellidos + numero de telefono 
  return (
    <div className="form-container">
         <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-content">
        <div className="form-left">

            <label>
            <input type='text'  {...register("name")} className="input"/>
            <span>Nombre</span>
            </label>
            <p>{errors.name?.message}</p>
           <label>
            <input type='text' placeholder='' {...register("lastName")} className="input"/>
            <span>Apellido paterno</span>

            </label>
            <p>{errors.lastName?.message}</p>
            <label>
            <input type='text' placeholder='' {...register("surName")}className="input"/>
            <span>Apellido Materno</span>
            </label>
            <p>{errors.surName?.message}</p>

            <label>
            <input type='text' placeholder='' {...register("email")} className="input"/>
            <span>Correo</span>
            </label>
            <p>{errors.email?.message}</p>
            </div>
            <p></p>
            <div className="form-right">
            <label>
            <input type='number' placeholder='' {...register("age")} className="input" />
            <span>Edad</span>

            </label>
            <p>{errors.age?.message}</p>
            <label>
            <input type='number' placeholder='' {...register("phone")} className="input"/>
            <span>Telefono</span>

            </label>
            <p>{errors.phone?.message}</p>
            <label>
            <input type='password' placeholder='' {...register("pass")} className="input" />
            <span>Contraseña</span>

            </label>
            <p>{errors.pass?.message}</p>
            <label>
            <input type='password' placeholder='' {...register("confirmPass")} className="input"/>
            <span>Confirma contraseña</span>

            </label>
            <p>{errors.confirmPass?.message}</p>
            </div>
            </div>


            <input type='submit'/>
        </form>
    </div>
  )
}
