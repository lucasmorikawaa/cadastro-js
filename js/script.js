$("#inputPrice").mask('000.000.000.000.000,00', {reverse: true});

function convertToNumber(priceFormat){
    return priceFormat.replace(/\./g, '').replace(',', '.');
}


var products = [
  {
    id: 1,
    name: "Computador M1-TX",
    description: "Intel I7, 16GB, SSD 256, HD 1T",
    price: 4900,
    category: 1,
    promotion: true,
    new: true,
  },
  {
    id: 2,
    name: "Computador M2-TX",
    description: "Intel I7, 32GB, SSD 512, HD 1T",
    price: 5900,
    category: 2,
    promotion: false,
    new: true,
  },
  {
    id: 3,
    name: "Computador M1-T",
    description: "Intel I5, 16GB, HD 1T",
    price: 2900,
    category: 3,
    promotion: false,
    new: false,
  },
];

var categories = [
  { id: 1, name: "Produção Própria" },
  { id: 2, name: "Nacional" },
  { id: 3, name: "Importado" },
];

loadProducts();

function loadProducts(){
    for(let prod of products){
        addNewRow(prod);
    }
}

function save(){

  var prod = {
    id: products.length + 1,
    name: document.getElementById("inputNome").value,
    description: document.getElementById("inputDescricao").value,
    price: convertToNumber(document.getElementById("inputPrice").value),
    category: document.getElementById("inputCategoria").value,
    promotion: document.getElementById("checkBoxPromotion").checked,
    new: document.getElementById("checkBoxNew").checked,
  };

  addNewRow(prod);
  products.push(prod);

  document.getElementById("formProduct").reset();

}

function addNewRow(prod){

    var table = document.getElementById("productsTable");
    var newRow = table.insertRow();

    newRow.insertCell().appendChild(document.createTextNode(prod.id));

    newRow.insertCell().appendChild(document.createTextNode(prod.name));

    var cellDesc = newRow.insertCell();
    cellDesc.className = "d-none d-md-table-cell";
    cellDesc.appendChild(document.createTextNode(prod.description));

    var formatador = new Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' });
    newRow.insertCell().appendChild(document.createTextNode(formatador.format(prod.price)));

    var nomeCat = categories[prod.category - 1].name;
    newRow.insertCell().appendChild(document.createTextNode(nomeCat));

    var options = '';
    if(prod.promotion) options += '<span class="badge text-bg-success me-1 d-none d-md-table-cell">P</span>';
    if(prod.new) options += '<span class="badge text-bg-primary d-none d-md-table-cell">L</span>';
    
    newRow.insertCell().innerHTML = options;


}