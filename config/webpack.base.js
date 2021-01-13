const path = require('path')
const fs = require('fs')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist')
}

const PAGES_DIR = PATHS.src   // для SPA
// const PAGES_DIR = `${PATHS.src}/html`   // для статичных сайтов
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.html'))

module.exports = {

  externals: {
    paths: PATHS
  },

  entry: {
    index: `${PATHS.src}/js`
  },
  
  output: {
    filename: `js/[name].js`,
    path: PATHS.dist,
    publicPath: '/'
  },

  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         name: 'vendor',
  //         test: /node_modules/,
  //         chunks: 'all',
  //         enforce: true
  //       },
  //       // homepage: {
  //       //   name: 'homepage',
  //       //   test: /homepage/,
  //       //   chunks: 'all',
  //       //   enforce: true
  //       // }
  //     }
  //   }
  // },

  module: {
    rules: [

      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: `[path][name].[ext]`,
          context: PATHS.src
        }
      },

      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /src/,
        loader: "file-loader",
        options: {
          regExp: /node_modules/,
          name: '[name].[ext]',
          outputPath: 'fonts/node-modules'
        }
      },

      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /node_modules/,
        loader: "file-loader",
        options: {
          name: `[path][name].[ext]`,
          context: PATHS.src
        }
      },

      {
        test: /\.(png|jpg|gif|svg)$/,
        exclude: /src/,
        loader: "file-loader",
        options: {
          regExp: /node_modules/,
          name: '[name].[ext]',
          outputPath: 'img/node-modules'
        }
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {sourceMap: true}
          },
          {
            loader: 'postcss-loader',
            options: {sourceMap: true, config: {path: `./postcss.config.js`}}
          },
          {
            loader: 'sass-loader',
            options: {sourceMap: true}
          }
        ],
      }
      
    ]
  },

  plugins: [

    new MiniCssExtractPlugin({
      filename: `css/[name].css`
    }),

    new CopyWebpackPlugin([
      // {from: `${PATHS.src}/.htaccess`, to: ``},
      // {from: `${PATHS.src}/img`, to: `img`},
      {from: `${PATHS.src}/fonts`, to: `fonts`},
      {from: `${PATHS.src}/assets`, to: ''}
    ]),

    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_DIR}/${page}`,
      filename: `${page}`
    }))
  ]
}