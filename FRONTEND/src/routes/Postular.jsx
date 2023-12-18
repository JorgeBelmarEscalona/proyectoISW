import React, {Fragment, useState} from "react";
import {Button, Select, Input } from "@chakra-ui/react";
import createPostulante from "../api/postulante";

const formPostulante = (props) => {
    const [formData, setFormdata] = useState({
        nombre: "",
        rut: "",
        direccion: "",
        sexo: "",
        estadoCivil: "",
        discapacidad: "",
        subsidio_E: "",
        aprobado_B: "",
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setFormdata({...formData, [name]: value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        await createPostulante(formData);
        setFormdata({
            nombre: "",
            rut: "",
            direccion: "",
            sexo: "",
            estadoCivil: "",
            discapacidad: "",
            subsidio_E: "",
            aprobado_B: "",
        });  
    };

    return (



<div>
    
    <form
        className="inline-form"
        onSubmit={handleSubmit}
        style={{ width: "60%", margin: "0 auto"}}
    >
    <center>
        <div>
            <h1>Ingrese sus Datos </h1>
                <label htmlFor="nombre">Nombre:</label>
            <Input
                type="text"
                name="nombre"
                id="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
            />
        </div>
    </center>
    <div>
        <center>
        <label htmlFor="rut">Rut:</label>
            <Input
                type="text"
                name="rut"
                id="rut"
                value={formData.rut}
                onChange={handleInputChange}
                required
            />
        </center>
    </div>
    <div>
        <center>
        <label htmlFor="direccion">Direccion:</label>
            <Input
                type="text"
                name="direccion"
                id="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                required
            />
        </center>
    </div>
    <div>
        <center>
        <label htmlFor="sexo">Sexo:</label>
            <Select 
            name="sexo" 
            id="sexo"
            value={formData.sexo}
            onChange={handleInputChange}
            required
            >
                <option value="">Seleccionar</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
            </Select>
        </center>
    </div>
    <div>
    <center>
        <label htmlFor="estadoCivil">Estado Civil:</label>
            <Select
            name="estadoCivil"
            id="estadoCivil"
            value={formData.estadoCivil}
            onChange={handleInputChange}
            required
            >
                <option value="">Seleccionar</option>
                <option value="Soltero">Soltero</option>
                <option value="Casado">Casado</option>
                <option value="Viudo">Viudo</option>
                <option value="Divorciado">Divorciado</option>
            </Select>
    </center>
    </div>

    <div>
        <center>
        <label htmlFor="discapacidad">Discapacidad:</label>
            <Select
            name="discapacidad"
            id="discapacidad"
            value={formData.discapacidad}
            onChange={handleInputChange}
            required
            >
                <option value="">Seleccionar</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
            </Select>
        </center>
    </div>
            
        <div>
            <center>
            <label htmlFor="subsidio_E">Subsidio:</label>
            <Select
            name="subsidio_E"
            id="subsidio_E"
            value={formData.subsidio_E}
            onChange={handleInputChange}
            
            >
                <option value="">Seleccionar</option>
                <option value="Alimentacion">Alimentacion</option>
                <option value="Utilidades">Utilidades</option>
                <option value="Vivienda">Vivienda</option>
            </Select>
            </center>
        </div>
            
        <div>
            <center>
                	<Button 
                        colorScheme="blue" 
                        borderRadius="md" 
                        type="submit"

                        >Guardar</Button>
            </center>
        </div>
            
        </form>
</div>
        
    );
};

export default formPostulante;
