# node-selector
Turn arbitrary commands into selectable lists

## Installation

Via npm:

    npm install -g TODO

## Usage

### Exec mode (default)

```bash
# sel --mode=exec <command to execute>

cd `sel ls`
(1)  LICENSE
(2)  README.md
(3)  index.js
(4)  node_modules
(5)  package.json

Which line do you want to select?
```

### JSON mode

```bash
# sel --mode=json '<JSON Array: [[value1, comment1], [value2, comment2], ...]>'

$ sel --mode=json '[["8.8.8.8", "Staging"], ["123.123.123.123.", "Production"]]'
(1)  8.8.8.8            ## Staging
(2)  123.123.123.123.   ## Production

Which line do you want to select?
```

### List mode

```bash
# sel --mode=list <space separated values>

$ sel --mode=list one two three
(1)  one
(2)  two
(3)  three

Which line do you want to select?
```

## Practical Examples

### Git Branch Switcher

```bash
$ git checkout `node index.js git branch`
(1)  coffeescript
(2)  * master
(3)  purescript
(4)  test

Which line do you want to select? 3
M README.md
Switched to branch 'purescript'
```