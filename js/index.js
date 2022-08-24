const productos = [
    {
        id: 1,
        imgSrc: "assets/img/alpha.png",
        modelo: "Alpha",
        tipo: "Mochila",
        tamanio:"35x20x15cm",
        genero: "unisex",
        precio: 12000,
        agregadoCarrito: false,
    },
    {
        id: 2,
        imgSrc: "assets/img/dunquerke.png",
        modelo: "Dunquerke",
        tipo: "Bolso",
        tamanio:"35x20x15cm",
        genero: "unisex",
        precio: 20000,
        agregadoCarrito: false,
    },
    {
        id: 3,
        imgSrc: "assets/img/halcones.png",
        modelo: "Halcones",
        tamanio:"35x20x15cm",
        tipo: "Bolso",
        genero: "unisex",
        precio: 10000,
        agregadoCarrito: false,
    },
    {
        id: 4,
        imgSrc: "assets/img/1000ftwallet.png",
        modelo: "Wallet - FT",
        tipo: "Accesorio",
        tamanio:"35x20x15cm",
        genero: "unisex",
        precio: 3500,
        agregadoCarrito: false,
    },
]

let container = document.querySelector('.container')

for (producto of productos){
    container.innerHTML +=`<article class="cardBox">
    <figure class="fotoProducto">
        <img src="${producto.imgSrc}" alt="">
    </figure>
    <div class="marcoSkew">
        <h4 class="modelo">${producto.modelo}</h4>
    </div>
    
    <figure class="estrellaFigure">
        <img class="afueraCarrito" id="${producto.id}" src="assets/img/estrella_tienda.svg" alt="">
    </figure>

    <div class="agregadoACarrito"></div>
    </div>
    <div class="detalle">
        <img class="afueraCarrito" id="${producto.id}" src="assets/img/sumar_a_carrito.svg" alt="">
    </div>

    <div class="caracteristicas">
        <p class="tipo">${producto.tipo}</p>
        <div class="barra"></div>
        <p class="medida">${producto.tamanio}</p>
    </div>
    <p class="precio">$ ${producto.precio}</p>
</article>`
}


const estrellas = document.querySelectorAll('.agregadoACarrito')
let canastoCarrito = document.querySelector('.canasto')
let recuperoStorage = localStorage.getItem('carrito')
let carrito = []

// Aplicando IF TERNARIO
recuperoStorage != null ? mostrarYGuardarProductos() : mostrarYGuardarProductos() 

let carritoContador = document.querySelector(".carritoContador")
let contador = 0

function mostrarYGuardarProductos(){
    for(estrella of estrellas){
        estrella.onmouseover = (e) =>{
            let element = e.target
            element.style.backgroundColor = 'rgba(0, 0, 0, 0.456)'
            element.nextElementSibling.style.display = 'block'
            }
        estrella.onmouseout = (e) =>{
            let element = e.target
            element.style.backgroundColor = 'rgba(0, 0, 0, 0)'
            element.nextElementSibling.style.display = 'none'

        }
        estrella.onclick = (e) => {
            let element = e.target.previousElementSibling.childNodes[1]
            let id = element.attributes.id.value    
            let productoElegido = productos.find(e => e.id == id)

            if(carrito.includes(productoElegido)){
                element.classList.remove('adentroCarrito')
                let productoASacar = carrito.indexOf(productoElegido)
                carrito.splice(productoASacar, 1)
                let productoRepetido = document.querySelector(`#id-${productoElegido.id}`)
                eliminar()
                canastoCarrito.removeChild(productoRepetido)
            }else{
                element.classList.add('adentroCarrito')
                carrito.push(productoElegido)
                
                swal({
                    title: "Buena Elección!",
                    text: `Sumaste el modelo ${productoElegido.modelo} a tu carrito!`,
                    icon: "success",
                })

                canastoCarrito.innerHTML +=`<article class="canastoBox" id="id-${productoElegido.id}">
                    <figure class="fotoCanasto">
                        <img src="${productoElegido.imgSrc}" alt="">
                    </figure>
                    <article class="canastoCaracteristicas">
                        <div class="marcoSkewCanasto">
                            <h4 class="modeloCanasto">${productoElegido.modelo}</h4>
                        </div>
                            <p class="tipoCanasto">${productoElegido.tipo}</p>
                            <p class="medidaCanasto">${productoElegido.tamanio}</p>
                        <p class="precio">$ ${productoElegido.precio}</p>
                    </article>
                    <div class="contadorCanasto">
                        <button class="quitar">-</button>
                        <span class="canastoContador">1</span>
                        <button class="agregar">+</button>
                    </div>
                    <div class="tachoBasura">
                        <img src="assets/img/tacho_tienda.svg" alt="">
                    </div>
                    <div class="confirmaCompra">
                        <button class="comprar">COMPRAR</button>
                    </div>
                </article>`
                const restadores = document.querySelectorAll('.quitar')
                const sumadores = document.querySelectorAll('.agregar')
                const vaciadores = document.querySelectorAll('.tachoBasura')
                const compradores = document.querySelectorAll('.comprar')
                let canastoContadores = document.querySelectorAll('.canastoContador')

                for(restador of restadores){
                    restador.onclick = (e) => {
                        resta()
                        for(canastoContador of canastoContadores){
                            canastoContador.innerText = contador
                        }
                    }
                }

                for(sumador of sumadores){
                    sumador.onclick = (e) => {
                        suma()
                        for(canastoContador of canastoContadores){
                            canastoContador.innerText = contador
                        }
                    }
                }
                
                for(vaciador of vaciadores){
                    vaciador.onclick = (e) => {
                        eliminar()
                    }
                }

                for(comprador of compradores){
                    comprador.onclick = (e) => {
                        swal({
                            title: "Ya Casi!",
                            text: `Estas por comprar el modelo ${productoElegido.modelo}!`,
                            icon: "warning",
                            buttons: ["Cancelar", "Confirmar"],
                        })
                        .then((result) => {
                            if(result){
                                eliminar()
                                swal({
                                    title: "Su compra ha sido realizada!",
                                    text: "Gracias por elegir 1000FT!",
                                    icon: "success",
                                })
                            }else{
                                eliminar()
                                swal({
                                    title: "Su compra ha sido cancelada!",
                                    text: "Seguinos en las redes por más novedades",
                                    icon: "error",
                                })
                            }
                        })
                    }
                }
                suma()
                
            }
            function suma (e){
                contador ++
                carritoContador.innerText = contador
            }

            function resta (e){
                contador --
                contador = contador < 0 ? 0 : contador 
                carritoContador.innerText = contador
                
                // Aplicando OPERADOR LOGICO AND &&
                carritoContador  < 0 && carritoContador == 0
            }

            function eliminar (e){
                element.classList.remove('adentroCarrito')
                let productoASacar = carrito.indexOf(productoElegido)
                carrito.splice(productoASacar, 1)
                let productoRepetido = document.querySelector(`#id-${productoElegido.id}`)
                canastoCarrito.removeChild(productoRepetido)
                contador = 0
                carritoContador.innerText = contador
            }
            
            localStorage.setItem('carrito', JSON.stringify(carrito))
        }
    }
}



