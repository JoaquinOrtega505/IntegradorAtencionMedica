// public/js/atencionMedica.js



/*document.getElementById('guardarAtencionBtn').addEventListener('click', function(e) {
    e.preventDefault(); // Evita la acción predeterminada del formulario

    // Recoge los datos del formulario
    const formData = new FormData(document.getElementById('formAtencionMedica'));

    fetch('/guardarAtencion', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            return response.text(); // Obtener respuesta del servidor si es exitosa
        } else {
            throw new Error('Error al guardar la atención médica');
        }
    })
    .then(data => {
        // Mostrar el mensaje de éxito sin redirigir
        document.getElementById('mensajeExito').innerText = data;
        document.getElementById('mensajeExito').style.display = 'block';

        // Limpiar los campos del formulario
        document.getElementById('formAtencionMedica').reset();
    })
    .catch(error => {
        console.error("Error al guardar la atención:", error);
        alert("Hubo un error al guardar la atención médica.");
    });
});



/*async function guardarAtencion(event) {
    event.preventDefault();

    const form = document.querySelector('.atencion-form');
    const formData = new FormData(form);

    try {
        const response = await fetch('/guardarAtencion', {
            method: 'POST',
            body: formData
        });

        const result = await response.text();

        if (response.ok) {
            alert('Atención médica guardada exitosamente');
            limpiarCampos(); // Limpiar campos después de guardar
        } else {
            alert(`Error al guardar la atención: ${result}`);
        }
    } catch (error) {
        console.error('Error al guardar la atención médica:', error);
        alert('Hubo un error al guardar la atención médica');
    }
}

function limpiarCampos() {
    document.querySelectorAll('.form-control').forEach(input => input.value = '');
}

document.querySelector('.atencion-form').addEventListener('submit', guardarAtencion);*/
