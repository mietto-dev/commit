// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const WorkboxWebpackPlugin = require("workbox-webpack-plugin")
const CopyPkgJsonPlugin = require("copy-pkg-json-webpack-plugin")
const webpack = require("webpack")

// const SlotWooCommerce = require("./slots/config/slot-woo-test.config.json")
const SlotWooCommerce = require("./slots/config/slot-kbdz.config.json")
const SlotWooCommerceNoCookies = require("./slots/config/slot-woo-nocookies.config.json")
const SlotBigCommerce = require("./slots/config/slot-big-pricing.config.json")
// const SlotBigCommerce = require("./slots/config/slot-big-test.config.json")
const SlotBigCommerceNoAnalytics = require("./slots/config/slot-big-noanalytics.config.json")
// const SlotAnalytics = require("./slots/config/slot-big-analytics.config.json")
const SlotAnalytics = require("./slots/config/slot-checkout-analytics.config.json")

const isProduction = process.env.NODE_ENV === "production"

let SlotConfig = isProduction ? {} : require("./slots/config/slot-woo-test.config.json")

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : "style-loader"

function buildConfig(env) {
  if (env.platform === "bigcommerce") {
    console.log("Building BigCommerce local Config....")
    SlotConfig = SlotBigCommerce
  }

  if (env.platform === "woocommerce") {
    console.log("Building WooCommerce local Config....")
    SlotConfig = SlotWooCommerce
  }

  if (env.platform === "bigcommerce:nopricing") {
    console.log("Building BigCommerce NO PRICING local Config....")
    SlotConfig = SlotBigCommerceNoAnalytics
  }

  if (env.platform === "analytics") {
    console.log("Building ANALYTICS local Config....")
    SlotConfig = SlotAnalytics
  }

  if (env.platform === "woocommerce:nocheckout") {
    console.log("Building BigCommerce NO CHECKOUT local Config....")
    SlotConfig = SlotWooCommerceNoCookies
  }

  const config = {
    entry: {
      "uli-bigcommerce": ["./projects/uli-bigcommerce/src/index.ts"],
      "uli-woocommerce": ["./projects/uli-woocommerce/src/index.ts"],
      "uli-analytics": ["./projects/uli-analytics/src/index.ts"],
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "[name].js",
    },

    devServer: {
      open: false,
      host: "localhost",
      allowedHosts: "all",
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: "./projects/uli-generic/public/index.html",
      }),
      new CopyPkgJsonPlugin({
        remove: ["devDependencies"],
      }),
      new webpack.DefinePlugin({
        "process.env.CONFIG": JSON.stringify(SlotConfig),
      }),
      new webpack.DefinePlugin({
        "process.env.LOG_LEVEL": isProduction ? "normal" : "verbose",
      }),
    ],
    target: "web",
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/i,
          loader: "ts-loader",
          exclude: ["/node_modules/"],
        },
        {
          test: /\.css$/i,
          use: [stylesHandler, "css-loader"],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [stylesHandler, "css-loader", "sass-loader"],
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
          type: "asset",
        },

        // Add your rules for custom modules here
        // Learn more about loaders from https://webpack.js.org/loaders/
      ],
      noParse: [/sjcl\.js$/],
    },
    devtool: "source-map",
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
      alias: {
        "@esw/uli-ui-components": path.resolve(__dirname, "./projects/uli-ui-components/src/"),
        "@esw/uli-framework": path.resolve(__dirname, "./projects/uli-framework/src/"),
        "@esw/uli-generic": path.resolve(__dirname, "./projects/uli-generic/src/"),
      },
      fallback: {
        fs: false,
        tls: false,
        net: false,
        path: false,
        zlib: false,
        http: false,
        https: false,
        stream: false,
        crypto: false,
      },
    },
  }
  return config
}

module.exports = (env) => {
  const config = buildConfig(env)
  if (isProduction) {
    config.mode = "production"
    config.plugins.push(new MiniCssExtractPlugin())
    config.plugins.push(new WorkboxWebpackPlugin.GenerateSW())
    config.optimization = {
      sideEffects: false,
    }
  } else {
    config.mode = "development"
    config.optimization = { sideEffects: false }
  }

  return config
}
