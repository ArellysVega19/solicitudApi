const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads',
            medidas: '/api/medidas',
            mailer: '/api/sendmailer',
            cosecha: '/api/cosecha',
            piscina: '/api/piscina',
            solicitud: '/api/solicitud',
            insumo: '/api/insumos',
            balanceado: '/api/balanceado',
            proveedor: '/api/proveedor',
            larva: '/api/larva',
            alimentacion: '/api/alimentacion',
            modulo: '/api/modulos',
            permiso: '/api/permisos',
        }


        // Conectar a base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }


    middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura y parseo del body
        this.app.use(express.json());

        // Directorio Público
        this.app.use(express.static('public'));

        // Fileupload - Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        //RUTAS APARTES
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.usuarios, require('../routes/usuarios'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
        this.app.use(this.paths.medidas, require('../routes/medidas'));
        this.app.use(this.paths.mailer, require('../routes/mailer'));

        this.app.use(this.paths.solicitud, require('../routes/solicitud'));
        this.app.use(this.paths.piscina, require('../routes/piscinas'));
        this.app.use(this.paths.cosecha, require('../routes/cosechas'));
        this.app.use(this.paths.proveedor, require('../routes/proveedores'));
        this.app.use(this.paths.balanceado, require('../routes/balanceados'));
        this.app.use(this.paths.larva, require('../routes/larvas'));
        this.app.use(this.paths.insumo, require('../routes/insumo'));
        this.app.use(this.paths.alimentacion, require('../routes/alimentacion'));
        this.app.use(this.paths.modulo, require('../routes/modulos'));
        this.app.use(this.paths.permiso, require('../routes/permisos'));
        //PROYECTO CRYTO

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }

}




module.exports = Server;
