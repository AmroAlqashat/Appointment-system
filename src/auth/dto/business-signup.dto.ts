import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength, IsEnum, Matches } from 'class-validator';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'
import { BusinessCategory } from '@prisma/client'

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

export class BusinessSignupDto {
    @IsString()
    @MaxLength(200)
    @MinLength(3)
    ownerFirstName!: string;

    @IsString()
    @MaxLength(200)
    @MinLength(3)
    ownerLastName!: string;

    @IsEmail()
    email!: string;

    @IsStrongPassword()
    password!: string;

    @IsConfirmPassword('password', {
        message: 'Passwords do not match',
    })
    confirmPassword!: string;

    @IsString()
    @MaxLength(200)
    @MinLength(2)
    businessName!: string;

    @IsEnum(BusinessCategory)
    businessCategory!: BusinessCategory;

    @IsString()
    @MaxLength(200)
    @MinLength(5)
    address!: string;

    @IsString()
    @MaxLength(200)
    @MinLength(10)
    description!: string;

    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Opening time must be in HH:mm format'
    })
    openingTime!: string;


    @Matches(/^([01]\d|2[0-3]):([0-5]\d)$/, {
        message: 'Closing time must be in HH:mm format'
    })
    closingTime!: string;
}