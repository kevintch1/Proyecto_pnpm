
import swaggerAutogen = require("swagger-autogen");// este genera la documentacion

const doc = {
    info: {
        title: "API de Estudiantes",
        description: "Documentación de la API REST para gestionar estudiantes y bootcamps.",
        version: "1.0.0"
    },
    host: "localhost:3000",
    schemes: ["http"]
};

const outputFile = "./src/swagger_output.json";
const routes = ["./src/index.ts"];

swaggerAutogen()(outputFile, routes, doc).then(() => {
    console.log("Documentación Swagger generada correctamente");
});
