#  Lightning Components with Babel &amp; SASS

## What is it?

This is a local dev environment I set up that runs inside a mavensmate project. It allows me to code [JavaScript resources using new syntax](https://babeljs.io/) and styles resources using [SASS](http://sass-lang.com/) while building [lightning components](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/intro_framework.htm). A separate dev directory (`aura-dev`) is used for development. A build process using gulp compiles JavaScript and SCSS into valid ES5 and CSS and outputs them to the `src/aura` directory.

## Dependencies

- [MavensMate](https://github.com/joeferraro/MavensMate/tree/master/docs#mavensmate-server)
- MavensMate CLI (for automatically deploying saved resources to salesforce). There's not much documentation on the command line tool, but it should be available after you install the MavensMate desktop application. Run `mavensmate -h`in your terminal to make sure you have it.
- I'm using Atom and the MavensMate Atom plugin, but Sublime Text should work as well.

## How it Works
1. Copy `gulpfile.js` and `package.json` to the root of your MavensMate project (siblings to the `src` directory)
2. `cd` to your project directory and run `npm install` from the command line

There are three gulp commands available:

### copy-source
Run `gulp copy-source` to copy the contents of `src/aura` to `aura-dev`. The style resource extension will be changed to `scss` in `aura-dev`. Files in the `aura-dev` directory will **not be overridden**. As you create new component bundles and pull into your project, you can safely run `gulp copy-source` to get your new component bundles into `aura-dev` for development.

### copy-dev
Running `gulp copy-dev` will do the following:
- Transpile all javascript resources in `aura-dev` and copy to the corresponding directory in `src/aura`:<br /> `aura-dev/TestCmp/TestCmpController.js` **==>** `src/aura/TestCmp/TestCmpController.js`
- Compile SASS to CSS in `aura-dev` and copy to corresponding directory in `src/aura`:<br />
`aura-dev/TestCmp/TestCmp.scss` **==>** `src/aura/TestCmp/TestCmpController.css`
- All other files will be copied to `src/aura` without changes.

### watch-dev
Running `gulp watch-dev` will watch all files in `aura-dev` and automatically transpile/compile/copy to `src/aura` when the file is saved. Once saved in `src/aura`, the resource is automatically saved to salesforce. MavensMate may require you to add your password to the `config/.settings` file.

## Project Challenges

Achieving the project's goals requires using local development tools to compile JavaScript and SASS. This means you can't modify your lightning components in the Salesforce developer console. The source files must always be modified in `aura-dev` of your local project or your work will be overridden when saved in `aura-dev`.

## TODOs

- Incorporate LockerService into `copy-dev` and `watch-dev`
