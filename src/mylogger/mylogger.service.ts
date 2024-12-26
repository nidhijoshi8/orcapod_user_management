import { Injectable, ConsoleLogger } from '@nestjs/common';
import * as fs from 'fs';
import { promises as fsPromises } from 'fs'
import * as path from 'path'

@Injectable()
export class MyLoggerService extends ConsoleLogger {

    private readonly logsDir = path.join(__dirname, '..', '..', 'logs');
    private readonly logFilePath = path.join(this.logsDir, 'myLogFile.log');

    private getFormattedTimestamp(): string {
        return Intl.DateTimeFormat('en-US', {
            dateStyle: 'short',
            timeStyle: 'short',
            timeZone: 'Asia/Kolkata',
        }).format(new Date());
    }


    async logToFile(entry: string){
        const formattedEntry = `${this.getFormattedTimestamp()}\t${entry}\n`;

        console.log(" in MyLoggerService ............... ")
        try {
            if (!fs.existsSync(this.logsDir)) {
                await fsPromises.mkdir(this.logsDir, { recursive: true });
            }
            await fsPromises.appendFile(this.logFilePath, formattedEntry);
        } catch (e) {
            console.error('Failed to write log to file:', e);
        }
    }

    formatMessage(message: any): string {
        if (typeof message === 'object') {
            try {
                return JSON.stringify(message, null, 2); // Beautify JSON for better readability
            } catch (e) {
                console.error('Unable to stringify message ', e);
                return 'Unable to stringify message';
            }
        }
        return String(message);
    }

    async log(message: any, context?: string) {
        const formattedMessage = this.formatMessage(message);
        const entry = `${context ?? 'NoContext'}\t${formattedMessage}`;
        await this.logToFile(entry);
        super.log(message, context);
    }

    async error(message: any, stackOrContext?: string) {
        const formattedMessage = this.formatMessage(message);
        const entry = `${stackOrContext ?? 'NoContext'}\t${formattedMessage}`;
        await this.logToFile(entry)
        super.error(message, stackOrContext)
    }
}
