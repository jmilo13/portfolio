//va a utilizar un require para traer al elemento path
//ya esta disponible en node, no requiere otra instalación
const path = require('path')
//incluye el plugin para trabajar con html
const HtmlWebpackplugin = require('html-webpack-plugin')
// se incluye el plugin de css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//se agrega el plugin de copiado de archivos
const CopyPlugin = require('copy-webpack-plugin')
const { loader } = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')


//la configuración se realiza creando un objeto
module.exports = {
    //indica el punto de entrada de la aplicación
    entry: './src/index.js',
    //hacia donde envía el producto de webpack, sería la carpeta dist
    output: {
        //el path permite usar resolve para saber el directorio 
        //en el cual se encuentra el proyecto, garantiza que
        //encuentre la carpeta. Se puede utilizar cualquier nombre
        //pero dist es un estandar
        path: path.resolve(__dirname, 'dist'),
        //se le asigna nombre al resultante unificado
        filename: '[name].[contenthash].js',
        //se agrega una carpeta de destino para las imágenes
        assetModuleFilename: 'assets/images/[hash][ext][query]'
    },
    mode: 'development',
    watch: true,
    resolve: {
        //se pasa por arreglo las extensiones utilizadas, pueden
        //ser otras dependiendo las tecnologías usadas
        extensions: ['.js'],
        alias: {
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/'),
            '@fonts': path.resolve(__dirname, 'src/assets/fonts/'),
        }
    },
    //se crea un módulo de configuración de babel
    module: {
        //este módulo contiene reglas
        rules: [
        {
            //utiliza la expesión regular para indicar la inclusión de
            //extensiones mjs(módulos) o sólo js
            test: /\.m?js$/,
            //se le indica que excluya los elementos de la carpeta
            //node_modules porque si lo hace rompería la aplicación
            exclude: /node_modules/,
            //se le indica el loader a utilizar, en este caso babel
            use: {
                loader: 'babel-loader'
            }
        },
        //se incluye otra regla para el plugin de css
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader,
            'css-loader']
        },
        //se incluye la regla para hacer loader de imágenes
        {
            test: /\.png$/,
            type: 'asset/resource'
        },
        // se incluye la configuración de url loader
        {
            test:/\.(woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000, // O LE PASAMOS UN BOOLEANOS TRUE O FALSE
                    // Habilita o deshabilita la transformación de archivos en base64.
                    mimetype: 'aplication/font-woff',
                    // Especifica el tipo MIME con el que se alineará el archivo. 
                    // Los MIME Types (Multipurpose Internet Mail Extensions)
                    // son la manera standard de mandar contenido a través de la red.
                    name: "[name].[contenthash].[ext]",
                    // EL NOMBRE INICIAL DEL ARCHIVO + SU EXTENSIÓN
                    // PUEDES AGREGARLE [name]hola.[ext] y el output del archivo seria 
                    // ubuntu-regularhola.woff
                    outputPath: './assets/fonts/', 
                    // EL DIRECTORIO DE SALIDA (SIN COMPLICACIONES)
                    publicPath: '../assets/fonts/',
                    // EL DIRECTORIO PUBLICO (SIN COMPLICACIONES)
                    esModule: false 
                    // AVISAR EXPLICITAMENTE SI ES UN MODULO
                },
            }
        }
        ]
    },
    //se añade la sección de plugins en un arreglo
    plugins: [
        //Se agrega el plugin de html
        new HtmlWebpackplugin({
            //como objeto se le pasa la configuración que va a tener
            //hace la inserción de los elementos
            inject: true,
            //se agrega un template(el index.html de public)
            template: './public/index.html',
            //se indica el nombre del resultado (que ira a la carpeta dist),
            //se deja el mismo nombre por convención
            filename: './index.html'
        }),
        //se incluye el plugin del css
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        // new CopyPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, "src", "assets/images"),
        //             to: "assets/images"
        //         }
        //     ]
        // })
        new Dotenv()
    ],
}