import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength, IsEnum } from 'class-validator';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

function IsConfirmPassword(property: string, validationOptions: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'IsConfirmPassword',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;

                    const relatedValue = (args.object as any)[relatedPropertyName];

                    return value === relatedValue;
                },

                defaultMessage(args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    return `${args.property} must match ${relatedPropertyName}`
                }
            }
        })
    }
}

enum BusinessCategory {
    BEAUTY = 'Hair & Beauty',
    HEALTH = 'Health & Wellness',
    FITNESS = 'Fitness & Training',
    CONSULTING = 'Consulting',
    AUTO_SERVICES = 'Auto Services',
    OTHERS = 'Others'
}

export class BusinessSignupDto {
    @IsString()
    @MaxLength(200)
    @MinLength(3)
    firstName!: string;

    @IsString()
    @MaxLength(200)
    @MinLength(3)
    lastName!: string;

    @IsEmail()
    email!: string;

    @IsStrongPassword()
    password!: string;

    @IsConfirmPassword('password', {
        message: 'Passwords do not match',
    })
    confirmPassword!: string;

    @IsString()
    businessName!: string;

    @IsEnum(BusinessCategory)
    businessCategory!: BusinessCategory;
}