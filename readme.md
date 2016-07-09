#  Lightning Components with Babel &amp; SASS

## What is it?

An attempt to build Salesforce lightning components with modern front end build tools like babel and SASS.  

## Project Goals

- Develop lightning components with latest version of JavaScript using [Babel](https://babeljs.io/)
- Compile [SASS]{http://sass-lang.com/} files to lightning component CSS resources
- Work with the tools I'm already using for Salesforce development (Atom, MavensMate)

## Project Challenges

Achieving the project's goals requires using local development tools to transpile JavaScript into ES5 syntax and SASS into CSS.  This means you can't modify your lightning components in the Salesforce developer console.  The source files must always be modified in your local project.

## TODOs

- Ignore xml files when copying from src to development directory.
- Compile .css files with SASS
    - Probably need to change .css file extension to .scss when copied from src/aura to aura-dev
- If a file is saved in aura-dev then copied into src/aura, automatically save to salesforce (This would also show compilation errors from salesforce)
