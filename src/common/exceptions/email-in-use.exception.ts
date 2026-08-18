import { ConflictException } from "@nestjs/common";

export class EmailInUseException extends ConflictException {
    constructor(email: string) {
        super({
            message: `Email ${email} is already registered`,
            errorCode: 'EMAIL_IN_USE',
        });
    }
}