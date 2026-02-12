proceso de instalacion 
1.si primera vez sin usamos primero los comando de npm install
2.Realizan cambios en valiables de entonrno se llama .env
3.Crea un base datos en mysql agrega el nombre al varibale entorno nombre_db y ingresa su contraseña de mysql en constraseña_db
4.Descomentar lo siguiente:
/*
db.authenticate()
  .then(() => {
    console.log(
      "============== Se conecto con el servidor de DB =============="
    );
    CrearModelos();
  })
  .catch((error) => console.log(error));
*/
5.Al descomentarlo ejecuta el comando npm run dev y crearia los modelos
6. Ahi estaria completo la instacion y listo para su uso.
