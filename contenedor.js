class Contenedor {
  constructor(productos) {
    this.productos = productos;
  }
  async getById(id) {
    if (this.productos.length > 0) {
      const encontrados = await this.productos.filter((prd) => prd.id == id);
      if (encontrados.length > 0) {
        return encontrados;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
  async save(product) {
    let id = 1;
    this.productos.forEach((prd) => {
      if (prd.id >= id) {
        id = prd.id + 1;
      }
    });
    const prodSave = {...{ id: id }, ...product};
    this.productos.push(prodSave);
  }

  async getAll() {
    return this.productos;
  }

  async getDeleteById(id){
    if(this.productos.length > 0){
      const newArray = await this.productos.filter(p => p.id != id)
      if(newArray.length === this.productos.length){return false}
      else{this.productos = newArray; return true}
    }
    return false
  }
}

const productos = new Contenedor([
  {
    id: 1,
    title: "zapatillas nike",
    price: 10.5,
    thumbnail:
      "https://sporting.vtexassets.com/arquivos/ids/610015-800-800?v=637968794926400000&width=800&height=800&aspect=true",
  },
]);

exports.productos = productos;
