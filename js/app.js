document.addEventListener("DOMContentLoaded", event => {
    /* crear el objeto para validar el formulario */

    const inputs = {
        email: '',
        asunto: '',
        mensaje: '',
        CC: ''
    }
    
    /* crear las variables que guardan elementos de nuestra interfaz */


    const formulario = document.querySelector('form')

    const inputEmail = formulario.querySelector('#email')

    const inputAsunto = formulario.querySelector('#asunto')

    const inputMensaje = formulario.querySelector('#mensaje')
    
    const inputCC = formulario.querySelector('#CC')
    console.log(inputCC)

    const btnSubmit = formulario.querySelector('#btnSubmit')

    const rowBtnSubmit = btnSubmit.parentElement.parentElement

    const btnReset = formulario.querySelector('#btnReset')

    const spinner = formulario.querySelector('.spinner')

    const clasesAlertaError = ['alert', 'alert-danger']

    const clasesAlertaSucces = ['alert', 'alert-success']



    /* funciones */

    const eliminarAlertas = () => {
        const alertas = document.querySelectorAll('.alert')
        alertas.forEach(alerta => alerta.remove())
    }

    const resetInput = () => {
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
    const mostrarAlerta = (mensaje, referenciaHTML, clase) => {
        limpiarMensaje(referenciaHTML)
        const alerta = document.createElement('div')
        alerta.textContent = mensaje
        alerta.classList.add(...clase, 'p-2', 'mt-2', 'text-center')
        referenciaHTML.after(alerta)

    }

    const validarInput = event => {
        const elementInput = event.target

        if(elementInput.id === "CC" && elementInput.value.trim() === "") {
            limpiarMensaje(elementInput)
            inputs[elementInput.id] = ''
            habilitarBoton()
            return
        }

        if(elementInput.id === "CC" && elementInput.value.trim() !== "" && !validarEmail(elementInput.value.trim())) {
            mostrarAlerta('El email no tiene un formato valido', elementInput, clasesAlertaError)
            inputs[elementInput.id] = ''
            habilitarBoton()
            return
        }

        /* validar que no este vacio */
        if (!elementInput.value.trim()) {
            mostrarAlerta(`El campo ${elementInput.id} no debe estar vacio`, elementInput, clasesAlertaError)
            inputs[elementInput.id] = ''
            habilitarBoton()
            console.log(inputs)
            return
        }

        if (elementInput.id === "email" && !validarEmail(elementInput.value.trim())) {
            mostrarAlerta('El email no tiene un formato valido', elementInput, clasesAlertaError)
            inputs['email'] = ''
            habilitarBoton()
            console.log(inputs)
            return
        }

        /* validar cuando esten correcto */
        limpiarMensaje(elementInput)
        inputs[elementInput.id] = elementInput.value.trim()
        habilitarBoton()
        console.log(inputs)
    }

    /* eventis listeners */
    inputEmail.addEventListener('blur', validarInput)
    inputAsunto.addEventListener('blur', validarInput)
    inputMensaje.addEventListener('blur', validarInput)
    inputCC.addEventListener('blur', validarInput)
    btnReset.addEventListener('click', event => {
        resetInput()
        eliminarAlertas()
        habilitarBoton()
    })

    btnSubmit.addEventListener('click', event => {
        event.preventDefault()
        spinner.classList.remove('visually-hidden')

        setTimeout(() => {
            spinner.classList.add('visually-hidden')
            mostrarAlerta('Mensaje enviado correctamente', rowBtnSubmit, clasesAlertaSucces)
            resetInput()
            formulario.reset()
            setTimeout(() => {
                limpiarMensaje(rowBtnSubmit)
            }, 3000)
        }, 3000);
    })
    
})
