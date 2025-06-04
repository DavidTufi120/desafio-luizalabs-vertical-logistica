import * as fs from 'fs';
import * as path from 'path';

export class FileDataService {
    async readDataFiles(dataDirectory: string): Promise<string[]> {
        const files = await fs.promises.readdir(dataDirectory);
        const dataFiles = files.filter(file => file.startsWith('data_') && file.endsWith('.txt'));

        const contents: string[] = [];
        for (const file of dataFiles) {
            const filePath = path.join(dataDirectory, file);
            const content = await fs.promises.readFile(filePath, 'utf-8');
            contents.push(content);
        }

        return contents;
    }
} 