import { Command, CommandRunner, Option } from 'nest-commander';
import * as fs from 'fs';
import * as path from 'path';

interface FileOptions {
  name: string;
  names: string;
}

@Command({ name: 'create-file', description: 'Cria um arquivo padrão' })
export class CreateFileCommand extends CommandRunner {
  private moduleName: string;
  private moduleClassName: string;

  async run(passedParam: string[], options?: FileOptions): Promise<void> {
    this.moduleName = options?.name || 'default';

    this.moduleClassName =
      this.moduleName.charAt(0).toUpperCase() + this.moduleName.slice(1);
    const templateDir = path.join(__dirname, '../src/@core/examples');
    const targetDir = path.join(
      __dirname,
      '../src/@core',
      this.convertSingularToPlural(this.moduleName)
    );

    if (fs.existsSync(targetDir)) {
      console.error(`Module ${this.moduleName} already exists.`);
      process.exit(1);
    }

    this.copyAndReplacePlaceholders(templateDir, targetDir);
  }

  // Função para copiar diretórios recursivamente
  copyAndReplacePlaceholders(srcDir: string, destDir: string) {
    fs.mkdirSync(destDir, { recursive: true });

    const entries = fs.readdirSync(srcDir, { withFileTypes: true });

    for (const entry of entries) {
      const srcPath = path.join(srcDir, entry.name);
      const destPath = path.join(
        destDir,
        entry.name
          .replace(/examples/g, this.convertSingularToPlural(this.moduleName))
          .replace(/example/g, this.moduleName)
      );

      if (entry.isDirectory()) {
        this.copyAndReplacePlaceholders(srcPath, destPath);
      } else {
        let content = fs.readFileSync(srcPath, 'utf8');
        content = content
          .replace(/Example/g, this.moduleClassName)
          .replace(/examples/g, this.convertSingularToPlural(this.moduleName))
          .replace(/example/g, this.moduleName);
        fs.writeFileSync(destPath, content);
      }
    }
  }

  convertSingularToPlural(word: string): string {
    if (word.endsWith('y') && !/[aeiou]/.test(word[word.length - 2])) {
      return word.slice(0, -1) + 'ies';
    } else if (
      word.endsWith('s') ||
      word.endsWith('x') ||
      word.endsWith('z') ||
      word.endsWith('ch') ||
      word.endsWith('sh')
    ) {
      return word + 'es';
    } else if (word.endsWith('f')) {
      return word.slice(0, -1) + 'ves';
    } else if (word.endsWith('fe')) {
      return word.slice(0, -2) + 'ves';
    } else if (word.endsWith('o') && !/[aeiou]/.test(word[word.length - 2])) {
      return word + 'es';
    } else {
      return word + 's';
    }
  }

  @Option({
    flags: '-n, --name [name]',
    description: 'Nome no singular',
  })
  parseName(val: string): string {
    return val;
  }

  @Option({
    flags: '-ns, --names [names]',
    description: 'Nome no pural',
  })
  parseContent(val: string): string {
    return val;
  }
}
