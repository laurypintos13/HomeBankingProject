const IDsaludo = document.getElementById('IDsaludo');
const printSaldo = document.getElementById('printSaldo');
const btnCerrarSesion = document.getElementById('btnCerrarSesion');
const printOperaciones = document.getElementById('printOperaciones');
const printServicios = document.getElementById('printServicios');
const printInput = document.getElementById('printInput');
const all = document.getElementById("all");
const btnMostrarMovimientos= document.getElementById('mostrarMovimientos');
const printBtnCerrarMov= document.getElementById('printBtnCerrarMov');
const allChat = document.getElementById("allChat")
const btnChat = document.getElementById("btnChat")
const btnForm = document.getElementById("btnForm")

//saludo principal segun la hora del dia.
function SaludoHora(){
    const fecha = new Date();
    const hora = fecha.getHours();
    
    if (hora >= 04 && hora < 12) {
        IDsaludo.innerHTML = `¡BUENOS DIAS! 👋`
    } else if(hora >= 13 && hora < 20){
        IDsaludo.innerHTML = `¡BUENAS TARDES! 👋`
    }else{
        IDsaludo.innerHTML = `¡BUENAS NOCHES! 👋`
    }
}
SaludoHora()
//funcion imprimir saldo
function imprimoSaldo(saldo){       
  printSaldo.innerHTML = `$${saldo}`;
  printInput.innerHTML = `<div class="divVacio"></div>`;
}
function inicializarCampo(llave, valorInicial){
  const valor = localStorage.getItem(llave)
    if(valor === null){
        imprimoSaldo(valorInicial)
        localStorage.setItem(llave, JSON.stringify(valorInicial))
    }else{
        imprimoSaldo(valor)
    }
}
function inicializar(){
  inicializarCampo('saldo', 0);
}
inicializar();

//funciones de los botones operaciones
function Extraer(){
    printInput.innerHTML =  ` <div class="divTransaccion animate__animated animate__fadeInDown">
                                Ingrese monto a extraer:
                                <input type="number" id="inputExtraer"></input><br>
                                <button id="btnInputExtraer" > Extraer</button>
                            </div>`
    const inputExtraer = document.getElementById('inputExtraer')
    const btnInputExtraer = document.getElementById('btnInputExtraer')

            
    btnInputExtraer.addEventListener('click', ()=>{    
        let saldoActual = parseInt(localStorage.getItem('saldo'));          
           
        if (inputExtraer.value == "" || inputExtraer.value <= 0){
            Toastify({
                text: "DEBES INGRESAR UN MONTO",                        
                duration: 2000,
                gravity: "bottom",
                position: "center",    
                style: {
                    background: "linear-gradient(to right, #fcac5d, #fcc75d)",
                    color: "#000000"
                },          
            }).showToast();
        } else{
            if (saldoActual < inputExtraer.value){                                           
                Toastify({
                    text: "SALDO INSUFICIENTE",                        
                    duration: 2000,
                    gravity: "bottom",
                    position: "center",    
                    style: {
                        background: "linear-gradient(to right, #fcac5d, #fcc75d)",
                        color: "#000000"
                    },          
                }).showToast();
            }
            else{
                saldoActual = saldoActual - parseInt(inputExtraer.value)
                Swal.fire({
                    icon: 'success',
                    title: 'EXTRACCION EXITOSA',
                })
                printInput.innerHTML = `<div class="divVacio"></div>`
                imprimoSaldo(saldoActual)
                localStorage.setItem('saldo', JSON.parse(saldoActual))    
                movimiento.push(new Movimientos("EXTRACCIÓN",inputExtraer.value, "Realizado con éxito"))
                    
            }
        }
    })
}
function Depositar(){
    printInput.innerHTML =  `<div class="divTransaccion animate__animated animate__fadeInDown">
                                Ingrese monto a depositar:
                                <input type="number" id="inputDepositar"></input>
                                <button id="btnInputDepositar"> Depositar</button>
                            </div>`
    const inputDepositar = document.getElementById('inputDepositar')
    const btnInputDepositar = document.getElementById('btnInputDepositar')
                                    
    btnInputDepositar.addEventListener('click', ()=>{
        let saldoActual = parseInt(localStorage.getItem('saldo'));

        if (inputDepositar.value == ""|| inputDepositar.value <= 0){
            Toastify({
                text: "DEBES INGRESAR UN MONTO",                        
                duration: 2000,
                gravity: "bottom",
                position: "center",    
                style: {
                    background: "linear-gradient(to right, #fcac5d, #fcc75d)",
                    color: "#000000"
                },          
            }).showToast();
        } else{
            saldoActual = saldoActual + parseInt(inputDepositar.value)
                Swal.fire({
                    icon: 'success',
                    title: 'DEPOSITO EXITOSO',
                })
            printInput.innerHTML = `<div class="divVacio"></div>`;
            imprimoSaldo(saldoActual);
            localStorage.setItem('saldo', JSON.parse(saldoActual))
            movimiento.push(new Movimientos("DEPÓSITO",inputDepositar.value,"Realizado con éxito"))

        }
    })
}
function Transferir(){
    printInput.innerHTML = `<div class="divTransaccion animate__animated animate__fadeInDown">
                                    Ingrese ALIAS:
                                    <input type="text" id="inputAlias"></input>
                                    Ingrese monto a transferir:
                                    <input type="number" id="inputTransferir"></input>
                                    <button id="btnInputTransferir"> TRANSFERIR</button>
                            </div>`
    const inputAlias = document.getElementById('inputAlias')
    const inputTransferir = document.getElementById('inputTransferir')
    
    btnInputTransferir.addEventListener('click',()=>{
        let saldoActual = parseInt(localStorage.getItem('saldo'));

        if (inputTransferir.value == "" || inputAlias.value == ""  || inputTransferir.value <= 0){
            Toastify({
                text: "DEBES INGRESAR LOS DATOS CORRECTAMENTE",                        
                duration: 2000,
                gravity: "bottom",
                position: "center",    
                style: {
                    background: "linear-gradient(to right, #fcac5d, #fcc75d)",
                    color: "#000000"
                },          
                }).showToast();
        } else{
            if (saldoActual < inputTransferir.value ){                                           
                Toastify({
                    text: "SALDO INSUFICIENTE",                        
                    duration: 2000,
                    gravity: "bottom",
                    position: "center",    
                    style: {
                        background: "linear-gradient(to right, #fcac5d, #fcc75d)",
                        color: "#000000"
                    },          
                }).showToast();
            }
            else{
                saldoActual = saldoActual - parseInt(inputTransferir.value)
                Swal.fire({
                    icon: 'success',
                    title: 'TRANSFERENCIA EXITOSA',
                })
                printInput.innerHTML = `<div class="divVacio"></div>`;
                imprimoSaldo(saldoActual)
                localStorage.setItem('saldo', JSON.parse(saldoActual))          
                movimiento.push(new Movimientos("TRANSFERENCIA",inputTransferir.value,"Realizado con éxito"))                          
            }
        }
    })
}
function Recargar(){
    printInput.innerHTML =  `<div class="divTransaccion animate__animated animate__fadeInDown">
                                Ingrese número de celular:
                                <input type="number" id="inputTel"></input>
                                Ingrese monto a Recargar:
                                <input type="number" id="inputRecargar"></input>
                                <button id="btnInputRecargar"> RECARGAR</button>
                            </div>`
    const inputRecargar = document.getElementById('inputRecargar')
    const btnInputRecargar = document.getElementById('btnInputRecargar')
        
    btnInputRecargar.addEventListener('click', ()=>{       
        let saldoActual = parseInt(localStorage.getItem('saldo'));
            
        if (inputRecargar.value == "" || inputTel.value == "" || inputRecargar.value <= 0){
            Toastify({
                text: "DEBES INGRESAR LOS DATOS CORRECTAMENTE",                        
                duration: 2000,
                gravity: "bottom",
                position: "center",    
                style: {
                    background: "linear-gradient(to right, #fcac5d, #fcc75d)",
                    color: "#000000"
                },          
            }).showToast();
        } else{  
            if (saldoActual < inputRecargar.value ){                                           
                Toastify({
                    text: "SALDO INSUFICIENTE",                        
                    duration: 2000,
                    gravity: "bottom",
                    position: "center",    
                    style: {
                        background: "linear-gradient(to right, #fcac5d, #fcc75d)",
                        color: "#000000"
                    },          
                }).showToast();
            }
            else{
                saldoActual = saldoActual - parseInt(inputRecargar.value)
                Swal.fire({
                    icon: 'success',
                    title: 'RECARGA EXITOSA',
                })
                printInput.innerHTML = `<div class="divVacio"></div>`;
                imprimoSaldo(saldoActual)
                localStorage.setItem('saldo', JSON.parse(saldoActual))
                movimiento.push(new Movimientos("RECARGA",inputRecargar.value,"Realizado con éxito"))                                     
            }
        }
    })
}
//imprimir dar funcionamiento a los botones de las operaciones
fetch('operaciones.json')
    .then( (res) => res.json())
    .then( (data) => {
        data.forEach((operacion) => {
            const div = document.createElement('div')
            div.innerHTML = `
                            <img id="${operacion.id}" src="${operacion.imagen}" alt="">
                            <p>${operacion.nombre}</p>                            `
            printOperaciones.append(div)
        })
    
    const btnidExtraer = document.getElementById("idExtraer")
    const btnidDepositar = document.getElementById("idDepositar")
    const btnidTransferir= document.getElementById("idTransferir")
    const btnidRecargar = document.getElementById("idRecargar")

    btnidExtraer.addEventListener('click', ()=>{
        Extraer();
    })
    btnidDepositar.addEventListener('click', ()=>{
        Depositar()
    })
    btnidTransferir.addEventListener('click', ()=>{
        Transferir()
    })
    btnidRecargar.addEventListener('click', ()=>{
        Recargar()
    })
})      
//mostrar movimientos del momento
class Movimientos {
    constructor (nombre, monto, estado){
        this.nombre = nombre;
        this.monto = monto;
        this.estado = estado;
    }
}
let movimiento = [];
    
btnMostrarMovimientos.addEventListener("click", ()=>{
    printInput.innerHTML  = ``
  
    if(movimiento == ""){
        Toastify({
            text: "NO HAY MOVIMIENTOS DEL MOMENTO",                        
            duration: 2000,
            gravity: "bottom",
            position: "center",    
            style: {
                background: "linear-gradient(to right, #fcac5d, #fcc75d)",
                color: "#000000"
            },          
        }).showToast();
        printInput.innerHTML = `<div class="divVacio"></div>`
    }else{
        for (let Movimientos of movimiento){
            printInput.innerHTML += `<div class="divTablaMovimientos animate__animated animate__fadeInDown">                            
                                        <div>
                                            <p>${Movimientos.nombre}</p>                                    
                                        </div>
                                        <div>
                                            <p>$${Movimientos.monto}</p>                                    
                                        </div>
                                        <div>
                                            <p>✅${Movimientos.estado} </p>                                    
                                        </div>`               
            btnMostrarMovimientos.disabled = true;
    
            printBtnCerrarMov.innerHTML =  `<div class="divbtnCerrarMov">           
                                            <button id="cerrarMovimientos" class="btnCerrarMov">cerrar</button>
                                            </div>`
            const cerrarMovimientos= document.getElementById('cerrarMovimientos')
    
            cerrarMovimientos.addEventListener("click", ()=>{
                printInput.innerHTML = ``
                btnMostrarMovimientos.disabled = false;
                printBtnCerrarMov.innerHTML =  ``
                printInput.innerHTML = `<div class="divVacio"></div>`

            })
        }
    }
})
//publicidad de estafa
function PublicidadEstafa(){ 
  Swal.fire({
        imageUrl: 'media/estafa.jpg',
        title: '¡CUIDATE DE LAS ESTAFAS!',
        text: 'NO COMPARTAS TU CLAVE O TOKEN CON NADIE.',
        footer: 'Si sospechás o recibiste una estafa, comunicate con nosotros.',
        showClass: {
            popup: 'animate__animated animate__fadeInDown'
          },
          hideClass: {
            popup: 'animate__animated animate__fadeOutUp'
          }
    })
}

let tiempoPublicidad = setTimeout(PublicidadEstafa, 30000);

//publicidad rotativa
function PublicidadRotativa(){
    let numPublidad = 0;
    let publicidades = [
                        "👉 Alcanzá eso que tanto querés y te hace bien. Tenés un Préstamo Personal listo para usar 😉",
                        "👉 30% de ahorro y hasta 6 cuofechatas sin interés con tus Tarjetas Visa 😱🔥",
                        "👉 Sabemos cuánto disfrutás tu casa. Tenemos el Seguro de Hogar para darte las coberturas y asistencias en la medida que necesitás 🙌🏼" 
                    ]
    let PrintPublicidad = document.getElementById('idPublicidad')

    function rotarPublicidad(){
        if(numPublidad < publicidades.length){
            PrintPublicidad.innerHTML = `<p class="textpublicidad">${publicidades[numPublidad]}</p>`
            numPublidad++
        } else{
            numPublidad = 0
        }
    }
    setInterval(rotarPublicidad, 5000);
}
PublicidadRotativa()

// cerrar sesion
function CerrarSesion(){
    btnCerrarSesion.addEventListener('click',()=>{
        all.style.display = "none";
        Swal.fire({
            imageUrl: 'media/cerrarsesion.jpg',
            title: '¡MUCHAS GRACIAS POR ELEGIRNOS!',
            text: 'SESIÓN CERRADA',
            footer: 'Ante cualquier duda, comunicate con nosotros',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
              },
              hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
              }
        })
    })
}
CerrarSesion()

//Chat de asistente virtual
btnChat.addEventListener("click", ()=>{
    printInput.innerHTML  = `<div class="divTransaccion animate__animated animate__fadeInDown">
                                <div class="pantallaChat animate__animated animate__fadeIn" id="ChatPantalla">
                                    <p>👋 Buenas tardes, Soy tu asistente virtual.</p><br>
                                    <p>1. ⚠️  ¿Qué es el token? </p>
                                    <p>2. 💳 Tarjeta de credito. </p>
                                    <p>3. 💲 Préstamo</p>
                                    <p>4. ➕ Más temas </p><br>
                                    <button class="btnRespuesta" id="resp1">1</button>
                                    <button class="btnRespuesta" id="resp2">2</button>
                                    <button class="btnRespuesta" id="resp3">3</button>
                                    <button class="btnRespuesta" id="resp4">4</button>
                                </div>
                            </div>`
    const resp1 = document.getElementById("resp1")
    const resp2 = document.getElementById("resp2")
    const resp3 = document.getElementById("resp3")
    const resp4 = document.getElementById("resp4")

    resp1.addEventListener("click", ()=>{
        printInput.innerHTML  = `<div class="divTransaccion">
                                    <div class="pantallaChat animate__animated animate__fadeIn" id="ChatPantalla">
                                        <p>⚠️TOKEN</p><br>
                                        <p>☑️Es un código de seguridad que te permite hacer transacciones, retiros de dinero y pagos sin necesidad de usar la tarjeta.</p>
                                        <p>☑️Para usarlo debes entrar a la app y seleccionar la opción Token.</p>
                                        <p>🙌¿Querés saber porque no debes compartirlo?</p><br>
                                        <button class="btnRespuesta" id="resp1si">Si, quiero saber</button>
                                        <button class="btnRespuesta" id="resp1no">No, gracias</button>
                                    </div>
                                </div>`
        const resp1si = document.getElementById("resp1si")
        const resp1no = document.getElementById("resp1no")
        
        resp1si.addEventListener("click", ()=>{
            printInput.innerHTML  = `<div class="divTransaccion">
                                        <div class="pantallaChat animate__animated animate__fadeIn" id="ChatPantalla">
                                            <p> ⚠️ Nunca compartas tus claves y Token con nadie, ni siquiera conmigo.</p><br>
                                            <p> ☝️ Con estos datos los estafadores pueden ingresar a tus cuentas bancarias, solicitar préstamos, transferir dinero, entre otras muchas operaciones.<p><br>
                                            <p> ☝️  Ante cualquier duda, comunicate con nosotros. </p><br>
                                            <button class="btnRespuesta" id="cerrarChat">Salir</button>
                                        </div>
                                    </div>`
           const cerrarChat = document.getElementById("cerrarChat")
           cerrarChat.addEventListener("click", ()=>{
                printInput.innerHTML = `<div class="divVacio"></div>`
            })
        })
        resp1no.addEventListener("click", ()=>{
            printInput.innerHTML  = `<div class="divTransaccion">
                                        <div class="pantallaChat animate__animated animate__fadeIn" id="ChatPantalla">
                                            <p> ¡Muchas gracias por usar nuestro asistente virtual! 🙌 </p><br>
                                            <button class="btnRespuesta" id="cerrarChat">Salir</button>
                                        </div>
                                    </div>`
            const cerrarChat = document.getElementById("cerrarChat")

            cerrarChat.addEventListener("click", ()=>{
                printInput.innerHTML = `<div class="divVacio"></div>`
            })
        })
    })   
    
    resp2.addEventListener("click", ()=>{
        printInput.innerHTML  = `<div class="divTransaccion">
                                    <div class="pantallaChat animate__animated animate__fadeIn" id="ChatPantalla">
                                        <p>💳 Con una tarjeta de Crédito podés:</p><br>
                                        <p>☑️Comprar sin tener plata en la cuenta.</p>
                                        <p>☑️comprar y pagar al mes siguiente.</p>
                                        <p>☑️A fin de mes recibís el resumen con el detalle de tus gastos y las cuotas pendientes para próximos meses.</p><br>
                                        <p>🙌¿Querés obtenerla?</p><br>
                                        <button class="btnRespuesta" id="resp1si">Si, quiero obtenerla</button>
                                        <button class="btnRespuesta" id="resp1no">No, gracias</button>
                                    </div>
                                </div>`
        const resp1si = document.getElementById("resp1si")
        const resp1no = document.getElementById("resp1no")
        
        resp1si.addEventListener("click", ()=>{
            printInput.innerHTML  = `<div class="divTransaccion">
                                        <div class="pantallaChat animate__animated animate__fadeIn" id="ChatPantalla">
                                            <p> ¡Qué bien! 🙌 Estás a muy poco de obtener tu tarjeta💳</p><br>
                                            <p>👤 En el transcurso del día un asesor se pondrá en contacto a tu mail registrado para continuar<p><br>
                                            <p>¡Muchas gracias, que tengas lindo día! 😊</p><br>
                                            <button class="btnRespuesta" id="cerrarChat">Salir</button>
                                        </div>
                                    </div>`
           const cerrarChat = document.getElementById("cerrarChat")
           cerrarChat.addEventListener("click", ()=>{
                printInput.innerHTML = `<div class="divVacio"></div>`
            })

        })
        resp1no.addEventListener("click", ()=>{
            printInput.innerHTML  = `<div class="divTransaccion">
                                        <div class="pantallaChat animate__animated animate__fadeIn" id="ChatPantalla">
                                            <p> ¡Muchas gracias por usar nuestro asistente virtual! 🙌 </p><br>
                                            <button class="btnRespuesta" id="cerrarChat">Salir</button>
                                        </div>
                                    </div>`
            const cerrarChat = document.getElementById("cerrarChat")
            cerrarChat.addEventListener("click", ()=>{
                printInput.innerHTML = `<div class="divVacio"></div>`
            })
        })
    })   

    resp3.addEventListener("click", ()=>{
        printInput.innerHTML  = `<div class="divTransaccion">
                                <div class="pantallaChat animate__animated animate__fadeIn" id="ChatPantalla">
                                    <p>💲¿Qué necesitás para pedir un Préstamo Personal?</p><br>
                                    <p>☑️Ingreso mínimo mensual de $56.000.</p>
                                    <p>☑️Tener entre 18 y 80 años.</p>
                                    <p>☑️Tener Token activo.</p><br>
                                    <p>🙌 ¿Cumplís con los requisitos y queres obtenerlo?</p><br>
                                    <button class="btnRespuesta" id="resp1si">Si, quiero obtenerlo</button>
                                    <button class="btnRespuesta" id="resp1no">No, gracias</button>
                            </div></div>`
        const resp1si = document.getElementById("resp1si")
        const resp1no = document.getElementById("resp1no")
        
        resp1si.addEventListener("click", ()=>{
            printInput.innerHTML  = `<div class="divTransaccion">
                                        <div class="pantallaChat animate__animated animate__fadeIn" id="ChatPantalla">
                                            <p>¡Qué bien! 🙌 Estás a muy poco de obtener tu préstamo 💲 <p><br>
                                            <p>👤 En el transcurso del día un asesor se pondrá en contacto a tu mail registrado para continuar<p><br>
                                            <p>¡Muchas gracias, que tengas lindo día! 😊</p><br>
                                            <button class="btnRespuesta" id="cerrarChat">Salir</button>
                                        </div>
                                    </div>`
           const cerrarChat = document.getElementById("cerrarChat")
           cerrarChat.addEventListener("click", ()=>{
                printInput.innerHTML = `<div class="divVacio"></div>`
            })

        })
        resp1no.addEventListener("click", ()=>{
            printInput.innerHTML  = `<div class="divTransaccion">
                                        <div class="pantallaChat animate__animated animate__fadeIn" id="ChatPantalla">
                                            <p> ¡Muchas gracias por usar nuestro asistente virtual! 🙌 </p>
                                            <button class="btnRespuesta" id="cerrarChat">Salir</button>
                                        </div>
                                    </div>`
            const cerrarChat = document.getElementById("cerrarChat")
            cerrarChat.addEventListener("click", ()=>{
                printInput.innerHTML = `<div class="divVacio"></div>`
            })
        })
    })   

    resp4.addEventListener("click", ()=>{
        printInput.innerHTML  = `<div class="divTransaccion">
                                    <div class="pantallaChat animate__animated animate__fadeIn" id="ChatPantalla">
                                        <p>👋Para obtener mas información y poder asesorarte mejor:</p><br>
                                        <p>☑️Envíame un correo a onlineBanking@banking.com </p>
                                        <p>☑️Envíame un WhatsApp al 3510000000 </p>
                                        <p>☑️Llámame al 0800-000-0000.</p>
                                        <p>🙌 Siempre estamos para ayudarte.</p><br>
                                        <p>¡Muchas gracias, que tengas lindo día! 😊</p><br>
                                        <button class="btnRespuesta" id="cerrarChat">Salir</button>
                                </div></div>`
        
           const cerrarChat = document.getElementById("cerrarChat")
           cerrarChat.addEventListener("click", ()=>{
                printInput.innerHTML = `<div class="divVacio"></div>`
           })
        })
    })   

//Formulario de contacto
btnForm.addEventListener("click", ()=>{
    printInput.innerHTML = `<div >
                                <form id="form" class="divTransaccion animate__animated animate__fadeInDown ">
                                    Nombre:
                                    <input name="formNombre" class="inputForm" type="text" id="inputNombre">
                                    Email:
                                    <input name="formEmail" class="inputForm" type="email" id="inputMail">
                                    Consulta:
                                    <textarea name="formTexto" class="textarea" id="inputArea"></textarea>
                                    <button type"submit" class="btnEnviarFormulario" id="btnFormEnviar">Enviar</button>
                                </form>
                            </div>`

    const form = document.getElementById("form")
    const btnForm = document.getElementById("btnFormEnviar")
    const inputNombre = document.getElementById("inputNombre")
    const inputMail = document.getElementById("inputMail")
    const inputArea = document.getElementById("inputArea")

    
    btnForm.addEventListener("click", (e)=>{  
        e.preventDefault(); 
        if(inputNombre.value == ""|| inputMail.value == "" || inputArea.value == ""){
            Toastify({
                text: "DEBE COMPLETAR LOS CAMPOS",                        
                duration: 2000,
                gravity: "bottom",
                position: "center",    
                style: {
                    background: "linear-gradient(to right, #fcac5d, #fcc75d)",
                    color: "#000000"
                },          
            }).showToast();
        } else{
              
            Swal.fire({
                title: 'Enviando mensaje...',
                showConfirmButton: false,
                timer: 3500
            })
        
            const formLoad = new FormData(form);
            console.log([...formLoad]);

            fetch('https://formsubmit.co/ajax/laurypintos.13@gmail.com',{
                method: "POST",
                body: formLoad
            })        
            .then(res => res.json())
            .then(data =>{            
            console.log(data)
                Swal.fire({
                    imageUrl: 'media/msjenviado.jpg',
                    title: '¡MENSAJE ENVIADO!',
                    text: 'Te contactaremos a la brevedad.',
                    showClass: {
                    popup: 'animate__animated animate__fadeInDown'
                    },
                    hideClass: {
                    popup: 'animate__animated animate__fadeOutUp'
                    }
                })
                printInput.innerHTML = `<div class="divVacio"></div>`
            })
            .catch(err => console.log(err));
        }
    })       
})