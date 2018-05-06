# Comment TS
"Comment TS" is a Visual Studio Code extension that automatically generates a template for JSDoc comments. It is adapted for TypeScript files. Typescript comes with a lot of language annotations, which should not be duplicated in the comments.

## Tags
Supported JSDoc tags: @description, @param, @returns, @template.

## Commands
`Ctrl+Alt+C` and again `Ctrl+Alt+C`
or select 'Comment...' from your context menu

Generates comments for whatever the caret is on or inside of.

The comments will look like:
```
  /**
   *
   * @param editor
   * @param commandName
   * @param forCompletion
   * @returns
   */

  /**
   * Creates an instance of Documenter.
   */

  /**
  * Capitalizes first letter
  * @param str
  * @returns
  */
```
## Settings
* "comment-ts.includeDescriptionTag": Adds @description before your comment.
* "comment-ts.includeAuthorTag": Adds an @author tag to your comment.
* "comment-ts.authorName": The text behind the @author tag.
* "comment-ts.parseNames": Parses the names so as to generate comments. E.g. GetAccessor will produce "gets <name> ". SetAccessor will produce "sets <name> ".

## Trace TypeScript Syntax Node
Prints info about the node ancestry at a given caret position.

## Documentation generator
* [TypeDoc](http://typedoc.org/guides/installation/)
A documentation generator for TypeScript projects.

## The original codebase is from Document This. Thanks to the contributors!
