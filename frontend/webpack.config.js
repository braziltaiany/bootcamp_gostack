const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'), // ler em todos os sistemas operacionais, sempre utilizar o path para lidar com caminhos
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js', //tranpilar no arquivo bundle
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
  },
  module: {
    rules: [
      //cada objeto é um loader, regras
      {
        test: /\.js$/, //pegar todos os arquivos com o final .js
        exclude: /node_modules/, //excluir a pasta node modules porque que tem arquivos .js
        use: {
          loader: 'babel-loader', //converter utilizando o babel os arquivos de extensão js
        },
      },
    ],
  },
};
