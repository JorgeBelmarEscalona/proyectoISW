import React, {useState} from "react";

const{createPostulante} = require("../api/postulante");

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
        props.onSave();
    };

    return (
        <form className="inline-form" onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre:</label>
            <input
                type="text"
                name="nombre"
                id="nombre"
                value={formData.nombre}
                onChange={handleInputChange}
                required
            />
            <label htmlFor="rut">Rut:</label>
            <input
                type="text"
                name="rut"
                id="rut"
                value={formData.rut}
                onChange={handleInputChange}
                required
            />
            <label htmlFor="direccion">Direccion:</label>
            <input
                type="text"
                name="direccion"
                id="direccion"
                value={formData.direccion}
                onChange={handleInputChange}
                required
            />
            <label htmlFor="Sexo">Sexo:</label>
            <select 
            name="Sexo" 
            id="sexo"
            value={formData.sexo}
            onChange={handleInputChange}
            required
            >
                <option value="">Seleccionar</option>
                <option value="Femenino">Femenino</option>
                <option value="Masculino">Masculino</option>
            </select>

            <label htmlFor="Estado Civil">Estado Civil:</label>
            <select
            name="Estado Civil"
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
            </select>

            <label htmlFor="Discapacidad">Discapacidad:</label>
            <select
            name="Discapacidad"
            id="discapacidad"
            value={formData.discapacidad}
            onChange={handleInputChange}
            required
            >
                <option value="">Seleccionar</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
            </select>

            <label htmlFor="Subsidio">Subsidio:</label>
            <select
            name="Subsidio"
            id="subsidio_E"
            value={formData.subsidio_E}
            onChange={handleInputChange}
            required
            >
                // falta un get de subsidio
                // FAVOR DEJARLO COMO UN SELECT VACIO
                //HASTA QUE SE HAGA EL GET

                <option value="">Seleccionar</option>
                <option value="Si">Si</option>
                <option value="No">No</option>
            </select>

            <button type="submit">Guardar</button>
        </form>
    );
};

export default formPostulante;
