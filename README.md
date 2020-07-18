# staffrender
A plain vanilla TypeScrip library to render music score in browsers

It has been created to support Tensorflow/Magenta-JS staff visualizer, but it could be used standalone.

From version 1.0.0 on, it offers access to its internal data structure `StaffModel` to process scores and hold musical blocks without visual representation.

This is a **work in process** project, who has some to do list, like triplets, quintuplets and shorter-than-quarter notes aggregation into beams (instead individual note flags), but it is fully operative. It will keep on growing and evolving. Some stand alone demos will be offered (currently focused on magenta-js consumption demos), but you can watch it in action building and serving the `./test` directory on local deployment.

## Usage
- `npm install staffrender`
- Latest version: `1.0.0`
- Documentation: [Staffrender Homepage](https://rogerpasky.github.io/staffrender/docs)

## Development
- Clone the repo
- Go to root directory (where README.md is located)
- Run `yarn install` to set up dependencies
- Run `yarn build` to preprocess typescript and create package
- Run `yarn docs` to compile typedoc documentation and serve it to verify content on local server
- Go to `./test` to run `yarn build`and `yarn serve` to visually and acustically test the code
- Run `yarn prepublish` to verify new version standard before any contribution
- Admin only:
  - Update version
  - Run `npm publish` 