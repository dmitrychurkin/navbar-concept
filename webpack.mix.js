const mix = require('laravel-mix');
const LiveReloadPlugin = require('webpack-livereload-plugin');

mix.ts('src/ts/app.ts', 'dist/js')
   .sass('src/sass/app.scss', 'dist/css')
   .copy('src/index.html', 'dist/')
   .copyDirectory('src/img', 'dist/img')
   .setPublicPath('dist')
   .webpackConfig({
      plugins: [
         new LiveReloadPlugin()
      ]
   })

if (mix.inProduction()) {
   mix.version();
} else {
   mix.browserSync();
}