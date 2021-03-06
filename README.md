# Comment TS
"Comment TS" generates a template for JSDoc comments. It is adapted for TypeScript files. Typescript comes with a lot of language annotations, which should not be duplicated in the comments. Most likely this would lead to inconsistencies.

Avoids warnings like:
* warning TS0: @static annotations are redundant with TypeScript equivalents
* warning TS0: @private annotations are redundant with TypeScript equivalents
* warning TS0: the type annotation on @param is redundant with its TypeScript type, remove the {...} part

Optionally additional TODOs are autogenerated.

## Tags
Supported JSDoc tags: @description, @param, @returns, @template.

## Conventions
* Let method/function names start with a verb.
* Use camelcase

## Commands
### To add a comment
* press `Ctrl+Alt+C` twice
* or select 'Comment code' from your context menu
* or insert /** above the line of code.

Generates comments for whatever the caret is on or inside of.

The comments will look like:
```
  /**
  * Creates an instance of documenter.
  */
  constructor()

  /**
  * // TODO: comment dispose
  * Disposes documenter
  */
  dispose() {

  /**
  * // TODO: comment getScriptVersion
  * Gets script version
  * @param fileName
  * @returns script version
  */
  getScriptVersion(fileName: string): string {

```
### To update an existing comment
If some parameters have changed, you might want to preserve comments of unchanged parameter.
* Select the comment block you want to update and
* press `Ctrl+Alt+C` twice
* or select 'Comment code' from your context menu
* or insert /** above the line of code.

## Settings
* "comment-ts.todoComments": If true a // TODO: line is added to the comments. If you are using an extension like [todo tree](https://marketplace.visualstudio.com/items?itemName=Gruntfuggly.todo-tree) you will find all comment TODOs in an explorer view.
* "comment-ts.replaceComments": Selected JSDoc comment will be updated. If parameters are added/deleted, comments of remaining parameters won't get lost.
* "comment-ts.includeDescriptionTag": Adds @description before your comment.
* "comment-ts.includeAuthorTag": Adds an @author tag to your comment.
* "comment-ts.authorName": The text behind the @author tag.
* "comment-ts.parseNames": Parses the names so as to generate comments. E.g. GetAccessor will produce "Gets <name> ". SetAccessor will produce "Sets <name> ", method camelcase names will be split, verbs get an s, except in special cases,...

## Documentation generator
* [Compodoc](https://compodoc.github.io/website/)
  Generate your Angular project documentation in seconds.

* [TypeDoc](http://typedoc.org/guides/installation/)
A documentation generator for TypeScript projects.

## Generate constructor with destructuring params
* Useful refactoring pattern for immutable model classes: A constructor is generated of all readonly fields.
* You may initialize the model with an object or with named params from an e.g. dto using the destructuring pattern.
```
const model = new Model( { result: 42, author: 'adams',.... } );
```

## Generate interface
* An interface is generated of all readonly fields.
* You may use this interface in the constructor of the class to exclude properties that shall not be initialized.
```
constructor X( dto: IX );
```

## Generate getter and setter of private
* Generates getter and setter properties of private fields starting with underscore.

## Some source code is copied and adapted from Document This and Typescript Toolbox. Thanks to the contributors!
