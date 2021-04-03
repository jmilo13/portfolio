//va a utilizar un require para traer al elemento path
//ya esta disponible en node, no requiere otra instalación
const path = require('path')
//incluye el plugin para trabajar con html
const HtmlWebpackplugin = require('html-webpack-plugin')
// se incluye el plugin de css
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


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
        filename: 'main.js',
    },
    resolve: {
        //se pasa por arreglo las extensiones utilizadas, pueden
        //ser otras dependiendo las tecnologías usadas
        extensions: ['.js']
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
        //se incluye el plugin
        new MiniCssExtractPlugin()
    ]
}