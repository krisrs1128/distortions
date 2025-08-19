
## Integrating JS Code
 
 One issue we encountered while developing this code is that the JavaScript is
 more complicated than the typical any widget example, and we don't want
 everything to be included in a single JavaScript file.  Initially, we tried
 packaging everything into an npm package and then importing through an ESM link
 in `render.js`. This seems to have caused issues, especially in vscode -- it
 seems that at times the link was blocked.  Our solution was to still use an npm
 package for writing the core js functionality, but instead of importing from a
 link, we bundle. You'll notice that the render.js script in the widgets
 directory is much more complicated than the render.js script in this folder.
 That's because the widgets version is the bundled output and includes all the
 needed background functions (nothing is downloaded).

To include a new js functionality, follow these steps (this is really a reminder
for myself more than anyone):

1. Make the necessary changes in the distortions-js package. For the sake of
getting us to work it's actually enough to do everything locally. But you should
still update the npm version, just for the sake of consistency.

2. Locally install the distortions package. This means navigating to wherever
`node_modules` is (on the current laptop, just `~/node_modules`) and then
running this command:

```
npm install ~/Desktop/collaborations/distortions-js
```

3. Go to this current directory and then go to render.js to use this new
distortions-js package version. You can do the bundling using esbuild. A wiser
person would put this on their path, but I just refer to the binary directly.

```
~/node_modules/esbuild/bin/esbuild --bundle --format=esm --outdir=widget render.js
```

4. At this point, you should be able to restart your notebooks and the updates
should appear.