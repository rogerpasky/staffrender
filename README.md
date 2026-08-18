# staffrender
A plain vanilla TypeScript library to render music score in browsers

It has been created to support Tensorflow/Magenta-JS staff visualizer, but it could be used standalone.

From version 1.0.0 on, it offers access to its internal data structure `StaffModel` to process scores and hold musical blocks without visual representation. This structure will be subject to changes up to version 2.0.0 where all musical features will be achieved.

This is a **work in process** project, who has some to do list, like triplets, quintuplets and shorter-than-quarter notes aggregation into beams (instead individual note flags), but it is fully operative. It will keep on growing and evolving. Some stand alone demos will be offered (currently focused on magenta-js consumption demos), but you can watch it in action building and serving the `./test` directory on local deployment.

## Usage
- `npm install staffrender`

## Reference
- Latest version: `1.2.4`
- Documentation: [Staffrender Homepage](https://rogerpasky.github.io/staffrender/)
- Features: [Musical capabilities](https://rogerpasky.github.io/staffrender/demo/features.html)
- Advanced usage: [Squeezing mm.StaffSVGVisualizer](https://rogerpasky.github.io/staffrender/demo/index.html)

## Development
- Clone the repo
- Go to root directory (where README.md is located)
- Run `yarn install` to set up dependencies
- Run `yarn build` to preprocess typescript and create package
- Run `yarn test` to verify unitary tests of current features
- Go to `./demo` to run `yarn build`and `yarn serve` to visually and acustically test the code on local server
- Run `yarn docs` to compile typedoc documentation and serve it to verify content on local server
- Run `yarn prepublish` to verify new version standard before any contribution
- Admin only:
  - Update version
  - Run `npm publish` 
