//se importa la clase instanciada de productos------------------------------
const { productos } = require("./contenedor");
//dependencias de librerias y framewoorks----------------------------------
const express = require("express");
const { Router } = express;

//se crea servidor y más----------------------------------
const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//levantamiento del servidor
const server = app.listen(PORT, () => {
  console.log(`Servidor levantado-PUERTO:${server.address().port}`);
});
server.on("error", (error) => {
  console.log(`Error:${error}`);
});

//carpeta visible
app.use(express.static(__dirname + "/public"));
//se establece rutaProductos y sus respuestas en base al tipo de petición--------------------------------
const rutaProductos = Router();

rutaProductos.get("/", (req, res) => {
  productos.getAll().then((r) => {
    res.json(r);
  });
});


rutaProductos.get("/:id", (req, res) => {
  productos.getById(req.params.id).then((r) => {
    r ? res.json(r) : res.status(404).json({error: "producto no encontrado"})
  });
});

rutaProductos.post("/", (req, res) => {
  const producto = req.body;
  if(!isNaN(producto.price)){
    producto.price = parseFloat(producto.price)
      productos.save(producto);
      res.json({valid: "Producto cargado"});
  }
  else{
    res.json({error: "caracteres invalidos"}).status(404)
  }
});

rutaProductos.delete("/:id", (req, res)=>{
    productos.getDeleteById(req.params.id).then(r=>{
        r ? res.json({valid: "se elimino un producto"}) : res.status(404).json({error: "producto no encontrado"})
    })
})

rutaProductos.put("/:id", async (req, res)=>{
  const {id, title, price, thumbnail} = req.body
  const proces = await productos.actualizacionProducto(req.params.id)
  if(proces===false){res.status(404).json({error:"producto no encontrado"})}
  else{
    proces({id, title, price, thumbnail})
    res.json({valid:"Se actualizo el producto"})
  }
  
})

app.use("/app/productos", rutaProductos);


//```````````````````````
