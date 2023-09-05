import { Injectable } from '@nestjs/common';
import * as qrcode from 'qrcode';

@Injectable()
export class QrCodeService {
    async generateQRCode(data: string, size: number = 250): Promise<string> {
        try {
            const qrCodeDataURL = await qrcode.toDataURL(data, { width: size });
            return qrCodeDataURL;
        } catch (error) {
            throw new Error(`Error al generar el código QR: ${error.message}`);
        }
    }
}
