
import { Module } from '@nestjs/common';
import {QrCodeService} from "./qr-code.service";

@Module({
    exports: [QrCodeService],
    providers: [QrCodeService],
    controllers: [],
    imports: [],
})
export class QrCodeModule {}
