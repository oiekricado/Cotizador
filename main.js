
function verificar() {
  let codigo =
    document.getElementById(
      "codigoderastreo"
    ).value; /*prompt("ingrese el codigo de pedido");*/
      
/////////////////////////////////FD////////////////////////////
  let getdatos = "https://sheetdb.io/api/v1/jr27h9yaoi7tr";
  fetch(getdatos)
    .then((data) => data.json())
    .then((datospedidos) => {
      function encontrarpedido(foliocodigo) {
        return foliocodigo.FOLIO === codigo;
      }
      let pedidoencontrado = datospedidos.find(encontrarpedido);

      console.log(pedidoencontrado.FOLIO);
      console.log(pedidoencontrado.CLIENTE);
      console.log(pedidoencontrado.EMPRESA);
      console.log(pedidoencontrado.NUMERO);
      console.log(pedidoencontrado.NUMEROCOTIZACION);
      let empresa = document.getElementById("infoCliente");
      empresa.innerHTML = `
      <p class="empresa text-xs col-start-1" id="empresa">Empresa:  ${pedidoencontrado.EMPRESA}</p>
      <p class="contacto text-xs col-start-1">Contacto: ${pedidoencontrado.CLIENTE}</p>
      <p class="numero text-xs col-start-1">Numero: ${pedidoencontrado.NUMERO}</p>
      <p class="cotizacion text-xs col-start-1">Cotización: ${pedidoencontrado.NUMEROCOTIZACION}</p>
      <p class="cotizacion text-xs col-start-2">Folio: ${pedidoencontrado.FOLIO}</p>
      `;
    });
//////////////////////////////////////////////////////////
    
 
    

  //////////consulta de letreros///////
  
  let getdatosCotizador =
    "https://sheetdb.io/api/v1/1a2tl55pd0jnu?sheet=ordenes_de_cliente";
  fetch(getdatosCotizador)
    .then((data) => data.json())
    .then((datospedidos) => {
      let encontrarpedidos = datospedidos.filter(function (dato) {
        return dato.CLIENTE === codigo;
      });


          /////////////////////cantidad de letreros///////////////
          let sum = 0;
          let resultadoCantidad = 0
          for (let i = 0; i < encontrarpedidos.length; i++) {
          cantidadint = Number(encontrarpedidos[i].cantidad)
          resultadoCantidad = sum += cantidadint
          resultadoCantidadtexto = String(resultadoCantidad)
          }
            console.log("es"+ resultadoCantidadtexto + "y" +resultadoCantidad )
            document.getElementById("letreros").innerHTML +=`
            <p class="sumaCantidadLetrero col-start-6 row-start-3 text-xs"> ${resultadoCantidadtexto}</p>
            `;
            console.log(resultadoCantidadtexto)
          ////////////////////////////////////////////////////////////


          
          ///////////////total///////////////////
          sumtotal = 0
          for (let i = 0; i < encontrarpedidos.length; i++) {
            precioint = Number(encontrarpedidos[i].PRECIO)
          sumtotal += precioint
          }
          console.log(sumtotal)
          document.getElementById("letreros").innerHTML +=`
            <p class="sumasubtotalLetrero col-start-7 row-start-6 text-xs border-b-2"> ${Math.round(sumtotal)}</p>
            `;
            /////////////////////////

            //////////////////sacar el subtotal//////////
            subtotal= sumtotal / 1.16
            document.getElementById("letreros").innerHTML +=`
            <p class="sumaIvaLetrero col-start-7 row-start-4 text-xs border-b-2"> ${Math.round(subtotal)}</p>
            `;
            ////////////////////////////////////

            ////////////////////////sacar iva///////////////
            iva = sumtotal.toFixed() - subtotal.toFixed()
            ivadecimal = iva
            document.getElementById("letreros").innerHTML += `
            <p class="sumaIvaLetrero col-start-7 row-start-5 text-xs border-b-2"> ${iva}</p>
            `;


     
      for (i = 0; i <= encontrarpedidos.length; i++) {
        console.log("el " + i + " es: " + encontrarpedidos[i].Letrero1);
        


        document.getElementById("contLetreros").innerHTML += `
            <p class=" letreropedido col-start-1 text-xs place-content-start border-b-2"> ${encontrarpedidos[i].Letrero1}</p> 
            <p class=" materialpedido col-start-2 text-xs border-b-2"> ${encontrarpedidos[i].MATERIAL}</p> 
            <p class=" anchopedido col-start-3 text-xs border-b-2"> ${encontrarpedidos[i].ANCHO}</p> 
            <p class=" altopedido col-start-4 text-xs border-b-2"> ${encontrarpedidos[i].ALTO}</p> 
            <p class=" precioletreropedido col-start-5 text-xs border-b-2"> ${encontrarpedidos[i].PRECIOXLETRERO}</p> 
            <p class=" cantidadpedido col-start-6 text-xs border-b-2"> ${encontrarpedidos[i].cantidad}</p> 
            <p class=" preciopedido col-start-7 text-xs border-b-2"> ${encontrarpedidos[i].PRECIO}</p>
        `;
        
      }

      
    });
    return codigo
}




//////////////////////////// aqui esta el codigo para descargar el pdf

function descargar() {
  let parrafosCliente = document.getElementById("infoCliente");
  parrafosCliente.style.wordSpacing = "5px";

  var element = document.getElementById("contenedor__hoja");
  html2pdf(element, {
    margin: 1,
    filename: `${verificar()}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  });
}
