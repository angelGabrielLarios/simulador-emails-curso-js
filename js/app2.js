document.addEventListener('DOMContentLoaded', () => {


    /* crear el objeto para sincronizar las respuestas de los inputs */
    const inputs = {
        email: '',
        asunto: '',
        mensaje: '',
        CC: ''
    }

    const formulario = document.querySelector('form')

    const inputEmail = formulario.querySelector('#email')

    const inputAsunto = formulario.querySelector('#asunto')

    const inputMensaje = formulario.querySelector('#mensaje')
    
    const inputCC = formulario.querySelector('#CC')
    

    const btnSubmit = formulario.querySelector('#btnSubmit')


    const btnReset = formulario.querySelector('#btnReset')

    const spinner = formulario.querySelector('.spinner')

    const clasesAlertaError = ['alert', 'alert-danger']

    const clasesAlertaSucces = ['alert', 'alert-success']


    const eliminarAlertas = () => {
        const alertas = document.querySelectorAll('.alert')
        alertas.forEach(alerta => alerta.remove())
    }

    const resetInputs = () => {
        for (const prop in inputs) {
            inputs[prop] = ""
        }
        console.log(inputs)
    }

    const habilitarBoton = () => {
        const inputsImportantes = {...inputs}
        delete inputsImportantes.CC

        const inputsEnBlanco = Object.values(inputsImportantes).includes('')
        if(inputsEnBlanco) {
            btnSubmit.setAttribute('disabled', true)
            return
        }
        btnSubmit.removeAttribute('disabled')
    }

    const validarEmail = email => {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email)
        return resultado
    }

    const limpiarMensaje = referenciaHTML => {
        const alerta = referenciaHTML.nextElementSibling
        if (alerta) {
            alerta.remove()
        }
    }

    const mostrarAlerta = (mensaje, referenciaHTML,posicion, clase) => {
        limpiarMensaje(referenciaHTML)
        const alerta = document.createElement('div')
        alerta.textContent = mensaje
        alerta.classList.add(...clase, 'p-2', 'mt-2', 'text-center')
        referenciaHTML.insertAdjacentElement(posicion, alerta)

    }

    const validarInput = event => {
        const elementInput = event.target
        const idInput = elementInput.id
        const valueInput = elementInput.value.trim()

        if(idInput === "CC" && !valueInput) {
            limpiarMensaje(elementInput)
            inputs[idInput] = ''
            habilitarBoton()
            return
        }

        if(idInput === "CC" && valueInput !== "" && !validarEmail(valueInput)) {
            mostrarAlerta(`El email no es valido`, elementInput, 'afterend', clasesAlertaError)
            inputs[idInput] = ''
            habilitarBoton()
            return
        }

        if(!valueInput) {
            mostrarAlerta(`El campo ${idInput} es obligatorio`, elementInput, 'afterend', clasesAlertaError)
            inputs[idInput] = ''
            habilitarBoton()
            return
        }

        if(idInput === "email" && !validarEmail(valueInput)) {
            mostrarAlerta(`El email no es valido`, elementInput, 'afterend', clasesAlertaError)
            inputs[idInput] = ''
            habilitarBoton()
            return
        }

        limpiarMensaje(elementInput)
        inputs[idInput] = valueInput
        habilitarBoton()
    }


    /* eventis listener */

    inputEmail.addEventListener('input', validarInput)
    inputCC.addEventListener('input', validarInput)
    inputAsunto.addEventListener('input', validarInput)
    inputMensaje.addEventListener('input', validarInput)

    btnReset.addEventListener('click', () => {
        resetInputs()
        habilitarBoton()
        eliminarAlertas()
    })

    btnSubmit.addEventListener('click', event => {
        event.preventDefault()
        spinner.classList.remove('visually-hidden')

        setTimeout(() => {
            spinner.classList.add('visually-hidden')
            mostrarAlerta('Mensaje enviado correctamente', btnSubmit.parentElement.parentElement, 'afterend',clasesAlertaSucces)
            resetInputs()
            formulario.reset()
            setTimeout(() => {
                limpiarMensaje(btnSubmit.parentElement.parentElement)
            }, 3000)
        }, 3000);
    })


})