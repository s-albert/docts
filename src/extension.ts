import * as vs from 'vscode';
import { Documenter } from './documenter';
import { generateClassesList, EType, generateCode, quickPickItemListFrom, generateAllGetterAndSetter } from './codegen';

const progLanguages = ['typescript', 'typescriptreact'];

let documenter: Documenter;

function lazyInitializeDocumenter() {
  if (!documenter) {
    documenter = new Documenter();
  }
}

function languageIsSupported(document: vs.TextDocument) {
  return progLanguages.findIndex((l) => document.languageId === l) !== -1;
}

function verifyLanguageSupport(document: vs.TextDocument, commandName: string) {
  if (!languageIsSupported(document)) {
    vs.window.showWarningMessage(`Sorry! '${commandName}' only supports TypeScript.`);
    return false;
  }

  return true;
}

function runCommand(commandName: string, document: vs.TextDocument, implFunc: () => void) {
  if (!verifyLanguageSupport(document, commandName)) {
    return;
  }

  try {
    lazyInitializeDocumenter();
    implFunc();
  } catch (e) {
    console.error(e);
  }
}

// Thanks, @mjbvz!
class DocThisCompletionItem extends vs.CompletionItem {
  constructor(document: vs.TextDocument, position: vs.Position) {
    super('/** Comment... */', vs.CompletionItemKind.Snippet);
    this.insertText = '';
    this.sortText = '\0';
    this.kind = vs.CompletionItemKind.Snippet;

    const line = document.lineAt(position.line).text;
    const prefix = line.slice(0, position.character).match(/\/\**\s*$/);
    const suffix = line.slice(position.character).match(/^\s*\**\//);
    const start = position.translate(0, prefix ? -prefix[0].length : 0);
    this.range = new vs.Range(start, position.translate(0, suffix ? suffix[0].length : 0));

    this.command = {
      title: 'Comment...',
      command: 'comment-ts.commentThis',
      arguments: [true]
    };
  }
}

export function activate(context: vs.ExtensionContext): void {

  context.subscriptions.push(
    vs.languages.registerCompletionItemProvider(
      progLanguages,
      {
        provideCompletionItems: (document: vs.TextDocument, position: vs.Position) => {
          const line = document.lineAt(position.line).text;
          const prefix = line.slice(0, position.character);

          if (prefix.match(/^\s*$|\/\*\*\s*$|^\s*\/\*\*+\s*$/)) {
            return [new DocThisCompletionItem(document, position)];
          }

          return;
        }
      },
      '/',
      '*'
    )
  );

  context.subscriptions.push(
    vs.commands.registerCommand('comment-ts.constructor', () => {
      const classesListBoth = generateClassesList(EType.BOTH);
      generateCode(classesListBoth, EType.CONSTRUCTOR);
    })
  );

  context.subscriptions.push(
    vs.commands.registerCommand('comment-ts.interface', () => {
      const classesListBoth = generateClassesList(EType.BOTH);
      generateCode(classesListBoth, EType.INTERFACE);
    })
  );

  context.subscriptions.push(
    vs.commands.registerCommand('comment-ts.commentThis', (forCompletion: boolean) => {
      const commandName = 'Comment...';

      runCommand(commandName, vs.window.activeTextEditor.document, () => {
        documenter.commentThis(vs.window.activeTextEditor, commandName, forCompletion);
      });
    })
  );

  context.subscriptions.push(
    vs.commands.registerCommand('comment-ts.getter', function() {
      const classesListGetter = generateClassesList(EType.GETTER);
      vs.window.showQuickPick(quickPickItemListFrom(classesListGetter)).then((pickedItem) => {
        generateCode(classesListGetter, EType.GETTER, pickedItem);
      });
    })
  );
  context.subscriptions.push(
    vs.commands.registerCommand('comment-ts.setter', function() {
      const classesListSetter = generateClassesList(EType.SETTER);
      vs.window.showQuickPick(quickPickItemListFrom(classesListSetter)).then((pickedItem) => {
        generateCode(classesListSetter, EType.SETTER, pickedItem);
      });
    })
  );
  context.subscriptions.push(
    vs.commands.registerCommand('comment-ts.allGetterAndSetter', function() {
      const classesListGetter = generateClassesList(EType.GETTER);
      const classesListSetter = generateClassesList(EType.SETTER);
      generateAllGetterAndSetter(classesListGetter, classesListSetter);
    })
  );
  context.subscriptions.push(
    vs.commands.registerCommand('comment-ts.getterAndSetter', function() {
      const classesListBoth = generateClassesList(EType.BOTH);
      vs.window.showQuickPick(quickPickItemListFrom(classesListBoth)).then((pickedItem) => {
        generateCode(classesListBoth, EType.BOTH, pickedItem);
      });
    })
  );

  context.subscriptions.push(
    vs.commands.registerCommand('comment-ts.traceTypeScriptSyntaxNode', () => {
      const commandName = 'Trace Typescript Syntax Node';

      runCommand(commandName, vs.window.activeTextEditor.document, () => {
        documenter.traceNode(vs.window.activeTextEditor);
      });
    })
  );
}
