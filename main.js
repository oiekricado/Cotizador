


let codigo =""
function verificar() {
  let codigo = document.getElementById("codigoderastreo").value; /*prompt("ingrese el codigo de pedido");*/

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
      let empresa = document.getElementById("infoCliente")
      empresa.innerHTML = `
      <p class="empresa text-xs" id="empresa">Empresa:  ${pedidoencontrado.EMPRESA}</p>
      <p class="contacto text-xs">Contacto: ${pedidoencontrado.CLIENTE}</p>
      <p class="numero text-xs">Numero:</p>
      <p class="cotizacion text-xs">Cotización:</p>`;

    });

  //////////consulta de letreros///////
  let getdatosCotizador =
    "https://sheetdb.io/api/v1/ffzwzy8glumlp?sheet=ordenes_de_cliente";
  fetch(getdatosCotizador)
    .then((data) => data.json())
    .then((datospedidos) => {
      let encontrarpedidos = datospedidos.filter(function (dato) {
        return dato.CLIENTE === codigo;
      });
      console.log(encontrarpedidos);

      for (i = 0; i <= encontrarpedidos.length; i++) {
        console.log("el " + i + " es: " + encontrarpedidos[i].Letrero1);
        
      }
    });

  


}



//////////////////////////// aqui esta el codigo para descargar el pdf
       
function descargar(){

  let parrafosCliente = document.getElementById("infoCliente")
  parrafosCliente.style.wordSpacing = "12px";


  var element = document.getElementById('contenedor__hoja');
  html2pdf(element, {
   margin:       5,
   filename:     `hhola.pdf`,
   image:        { type: 'jpeg', quality: 0.98 },
   html2canvas:  { scale: 2, logging: true, dpi: 192, letterRendering: true },
   jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  });

  
}




