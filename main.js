function  verificar() {
  console.time("codigo")
  let codigo = document
    .getElementById("codigoderastreo")
    .value.toUpperCase(); /*prompt("ingrese el codigo de pedido");*/

  if (codigo.includes("SD") === true || codigo.includes("FD") === true) {
    console.log("todo ok");
  } else {
    alert("ingrese un folio valido");
  }
  
  if (codigo.includes("SD") === true) {
    console.log("ES un folio SD");
    /////////////////////////////////FD////////////////////////////
    let getdatos = "https://sheetdb.io/api/v1/wy8b9jp5ln99i?sheet=SD";
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
        
       

        let empresa = document.getElementById("infoCliente");
        empresa.innerHTML = `
      <p class="empresa text-xs col-start-1" id="empresa">Empresa:  ${pedidoencontrado.EMPRESA}</p>
      <p class="contacto text-xs col-start-1">Contacto: ${pedidoencontrado.CLIENTE}</p>
      <p class="numero text-xs col-start-1">Numero: ${pedidoencontrado.NUMERO}</p>
      <p class="observaciones text-xs col-start-1">Observaciones: ${pedidoencontrado.OBSERVACIONES}</p>
      <p class="folio text-xs col-start-2">Folio: ${pedidoencontrado.FOLIO}</p>
      
      `;
      });
    //////////////////////////////////////////////////////////

    
  } else {
    console.log("es un folio FD");
    /////////////////////////////////FD////////////////////////////
    let getdatos = "https://sheetdb.io/api/v1/wy8b9jp5ln99i";
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
      <p class="cotizacion text-xs col-start-1">Observaciones: ${pedidoencontrado.OBSERVACIONES}</p>
      <p class="cotizacion text-xs col-start-2">Folio: ${pedidoencontrado.FOLIO}</p>
      
      `;
      });
    //////////////////////////////////////////////////////////
  } ///termino de else
 
  //////////consulta de letreros///////

  let getdatosCotizador =
    "https://sheetdb.io/api/v1/ld5n9p2ij9htg?sheet=ordenes_de_cliente";
  fetch(getdatosCotizador)
    .then((data) => data.json())
    .then((datospedidos) => {
      let encontrarpedidos = datospedidos.filter(function (dato) {
        return dato.CLIENTE === codigo;
      });

      /////////////////////cantidad de letreros///////////////
      let sum = 0;
      let resultadoCantidad = 0;
      for (let i = 0; i < encontrarpedidos.length; i++) {
        cantidadint = Number(encontrarpedidos[i].cantidad);
        resultadoCantidad = sum += cantidadint;
        resultadoCantidadtexto = String(resultadoCantidad);
      }
      console.log("es" + resultadoCantidadtexto + "y" + resultadoCantidad);
      document.getElementById("letreros").innerHTML += `
            <p class="sumaCantidadLetrero col-start-6 row-start-3 text-xs"> ${resultadoCantidadtexto}</p>
            `;
      console.log(resultadoCantidadtexto);
      ////////////////////////////////////////////////////////////

     /* if(encontrarpedidos[0].DESCUENTOSD.length > 0 || encontrarpedidos[0].DESCUENTOFD.length > 0){ */
        
        ///////////////totalbruto///////////////////
      sumtotal = 0;
      for (let i = 0; i < encontrarpedidos.length; i++) {
        precioint = Number(encontrarpedidos[i].PRECIO);
        sumtotal += precioint;
      }
      console.log(sumtotal);
            console.log({sumtotal})
      ////////////////////////////////////
        ///////////////////////////////////////////////////////
       //////////////////////////descuento/subtotal/////////////
       ///////////////////////////////////////////////////////////
       if (codigo.includes("SD") === true){
       ///////////////////////// 
      porcentaje =(encontrarpedidos[0].DESCUENTOSD /100)*(sumtotal)
      //////////////////sacar el subtotal//////////
      subtotal = sumtotal - porcentaje;
      document.getElementById("letreros").innerHTML += `
            <p class="sumasubtotalLetrero col-start-7 row-start-4 text-xs border-b-2"> ${parseFloat(sumtotal).toFixed(2)}</p>
            `;
            console.log({subtotal})
       }else{
       ///////////////////////// 
      porcentaje =(encontrarpedidos[0].DESCUENTOFD /100)*(sumtotal)
      //////////////////sacar el subtotal//////////
      subtotal = sumtotal - porcentaje;
      document.getElementById("letreros").innerHTML += `
            <p class="sumasubtotalLetrero col-start-7 row-start-4 text-xs border-b-2"> ${parseFloat(subtotal).toFixed(2)}</p>   
            `;
            console.log({subtotal})
       }
      ////////////////////////sacar iva///////////////
      subiva= subtotal*1.16;
      iva = subiva-subtotal
      document.getElementById("letreros").innerHTML += `
            <p class="sumaIvaLetrero col-start-7 row-start-5 text-xs border-b-2"> ${parseFloat(iva).toFixed(2)}</p>
            `;
            console.log({iva})
      /////////////////////////total definitivo/////////////////
       total= subtotal + iva;
       document.getElementById("letreros").innerHTML += `
            <p class="sumatotalLetrero col-start-7 row-start-6 text-xs border-b-2"> ${parseFloat(total).toFixed(2)}</p>
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
    console.timeEnd("codigo")
}


//////////////////////////// aqui esta el codigo para descargar el pdf

function descargar() {
  foliopdf = document.getElementById("codigoderastreo").value.toUpperCase();

  contactopdf = document.getElementsByClassName("contacto");

  let parrafosCliente = document.getElementById("infoCliente");
  parrafosCliente.style.wordSpacing = "5px";

  var element = document.getElementById("contenedor__hoja");
  html2pdf(element, {
    margin: 1,
    filename: `${foliopdf}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, logging: true, dpi: 192, letterRendering: true },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  });



}






