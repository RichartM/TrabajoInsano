import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserContext';
import "../styles/Form.css";

export default function Form() {
    const navigate = useNavigate();
    const { registerUser } = useContext(UserContext);

    const schema = yup.object().shape({
        name: yup.string().required("El nombre es requerido"),
        lastName: yup.string().required("El apellido paterno es requerido"),
        surName: yup.string().required("El apellido materno es requerido"),
        email: yup.string().email("Formato de email incorrecto").required("El correo es requerido"),
        age: yup.number().required("La edad es requerida").integer().min(18, "La edad mínima es 18"),
        phone: yup.string().matches(/^[0-9]{10}$/, "Debe ser un número de 10 dígitos").required("El número de teléfono es requerido"),
        pass: yup.string().min(4, "Mínimo 4 caracteres").max(10, "Máximo 10 caracteres").required("La contraseña es obligatoria"),
        confirmPass: yup.string().oneOf([yup.ref("pass"), null], "Las contraseñas deben coincidir")
    });

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    function onSubmit(data) {
        registerUser(data);
        alert("Registro exitoso. Ahora inicia sesión.");
        navigate('/login');
    }


    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <div className="form-content">
                    <div className="form-left">
                        <label>
                            <input type='text'  {...register("name")} className="input" />
                            <span>Nombre</span>
                        </label>
                        <p>{errors.name?.message}</p>

                        <label>
                            <input type='text' placeholder='' {...register("lastName")} className="input" />
                            <span>Apellido paterno</span>
                        </label>
                        <p>{errors.lastName?.message}</p>

                        <label>
                            <input type='text' placeholder='' {...register("surName")} className="input" />
                            <span>Apellido Materno</span>
                        </label>
                        <p>{errors.surName?.message}</p>

                        <label>
                            <input type='text' placeholder='' {...register("email")} className="input" />
                            <span>Correo</span>
                        </label>
                        <p>{errors.email?.message}</p>
                    </div>

                    <div className="form-right">
                        <label>
                            <input type='number' placeholder='' {...register("age")} className="input" />
                            <span>Edad</span>
                        </label>
                        <p>{errors.age?.message}</p>

                        <label>
                            <input type='number' placeholder='' {...register("phone")} className="input" />
                            <span>Telefono</span>
                        </label>
                        <p>{errors.phone?.message}</p>

                        <label>
                            <input type='password' placeholder='' {...register("pass")} className="input" />
                            <span>Contraseña</span>
                        </label>
                        <p>{errors.pass?.message}</p>

                        <label>
                            <input type='password' placeholder='' {...register("confirmPass")} className="input" />
                            <span>Confirma contraseña</span>
                        </label>
                        <p>{errors.confirmPass?.message}</p>
                    </div>
                </div>
                <button type='submit' className="submit">Registrarse</button>
            </form>
        </div>
    );
}