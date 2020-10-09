import * as ts from 'typescript';

export class LanguageServiceHost implements ts.LanguageServiceHost {
  private _files: ts.Map<{ text: string; version: number }> = <ts.Map<{ text: string; version: number }>>{};

  updateCurrentFile(fileName: string, fileText: string): void {
    for (const existingFileName in this._files) {
      delete this._files[existingFileName].text;
    }

    if (this._files[fileName]) {
      this._files[fileName].version++;
      this._files[fileName].text = fileText;
    } else {
      this._files[fileName] = { text: fileText, version: 0 };
    }
  }

  getScriptFileNames(): string[] {
    return Object.keys(this._files);
  }

  /**
   * // TODO: comment getScriptVersion
   * Gets script version
   * @param fileName
   * @returns script version
   */
  getScriptVersion(fileName: string): string {
    return this._files[fileName] && this._files[fileName].version.toString();
  }

  getScriptSnapshot(fileName: string): ts.IScriptSnapshot {
    return ts.ScriptSnapshot.fromString(this._files[fileName] ? this._files[fileName].text : '');
  }

  getCurrentDirectory(): string {
    return process.cwd();
  }

  getDefaultLibFileName(options: ts.CompilerOptions): string {
    return ts.getDefaultLibFilePath(options);
  }

  getCompilationSettings(): ts.CompilerOptions {
    return {
      allowJs: true,
    };
  }

  getSourceFile(fileName: string): ts.SourceFile | undefined {
    if (this._files[fileName]) {
      return ts.createSourceFile(fileName, this._files[fileName].text, ts.ScriptTarget.Latest);
    } else {
      return undefined;
    }
  }
}
