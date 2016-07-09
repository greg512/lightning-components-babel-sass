#  Lightning Components with Babel &amp; SASS

## Project Goals

- Use [Babel](https://babeljs.io/) to code in the latest version of JavaScript while building lightning components
- Write CSS for lightning components using SASS syntax
- Work with my existing Salesforce development tools (Atom, MavensMate)

## Project Challenges

Achieving the project's goals requires using local development tools to transpile JavaScript into ES5 syntax and SASS into CSS.  This means you can't modify your lightning components in the Salesforce developer console.  The source files must always be modified in your local project.

## TODOs
- Create a command that allows you to copy over components that don't already exist from src/aura into dev/aura
    - Ignore the xml file.
- Allow user to watch files in dev/aura and automatically copy over files to src/aura when changes are made
    - Need to move exact copy of .cmp, .app and .auradoc files
    - Transpile .js files and compile .css files with SASS
    - If a file is saves in dev/aura, then copied into src/aura - can we automatically save that change to salesforce
