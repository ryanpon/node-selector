# node-selector
Turn arbitrary commands into selectable lists

### Example: instantly create a branch switcher alias
```bash
$ alias 'switch-branch'='git checkout `sel git branch`'
$ switch-branch
(1)  coffeescript
(2)  * master
(3)  purescript
(4)  test

Which line do you want to select? 3
Switched to branch 'purescript'
```

## Installation
Via npm:

    npm install -g cli-selector

## Usage
### Exec mode (default): -e | --exec

```bash
# sel --exec <command to execute>

cd `sel ls`
(1)  LICENSE
(2)  README.md
(3)  index.js
(4)  node_modules
(5)  package.json

Which line do you want to select?
```

### JSON mode: -j | --json

Select from an array of 2-tuples. The first value in each tuple will be treated as the value and the second will be treated as a comment. Useful for cryptic values.

```bash
# sel --json '<JSON Array: [[value1, comment1], [value2, comment2], ...]>'

$ sel --json '[["8.8.8.8", "Staging"], ["123.123.123.123", "Production"]]'
(1)  8.8.8.8            ## Staging
(2)  123.123.123.123   ## Production

Which line do you want to select?
```

### List mode: -l | --list

Select from a space separated list of values.

```bash
# sel --list <space separated values>

$ sel --list one two three
(1)  one
(2)  two
(3)  three

Which line do you want to select?
```
