import React from 'react'
import {useForm} from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'


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
    <div>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type='text' placeholder='Nombre' {...register("name")}/>
            <p>{errors.name?.message}</p>

            <input type='text' placeholder='Apellido Paterno' {...register("lastName")}/>
            <p>{errors.lastName?.message}</p>

            <input type='text' placeholder='Apellido Materno' {...register("surName")}/>
            <p>{errors.surName?.message}</p>

            <input type='text' placeholder='Email' {...register("email")}/>
            <p>{errors.email?.message}</p>

            <input type='number' placeholder='Edad' {...register("age")}/>
            <p>{errors.age?.message}</p>

            <input type='number' placeholder='Teléfono' {...register("phone")}/>
            <p>{errors.phone?.message}</p>

            <input type='password' placeholder='Ingresa la contraseña' {...register("pass")} />
            <p>{errors.pass?.message}</p>

            <input type='password' placeholder='Confirmar contraseña' {...register("confirmPass")}/>
            <p>{errors.confirmPass?.message}</p>

            <input type='submit'/>
        </form>
    </div>
  )
}
