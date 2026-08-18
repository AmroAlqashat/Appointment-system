import { ConflictException } from "@nestjs/common";

export class PasswordDontMatch extends ConflictException {
    constructor() {
        super({
            message: `Passwords don't match`,
            errorCode: 'PASSWORDS_DONT_MATCH',
        });
    }
}