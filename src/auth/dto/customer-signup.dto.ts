import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

function IsConfirmPassword(property: string, validationOptions: ValidationOptions) {
  return function(object: Object, propertyName: string) {
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

export class CustomerSignupDto {
  @IsString({ message: "First name must be valid string." })
  @MaxLength(200, { message: "First name cannot exceed 200 characters." })
  @MinLength(2, { message: "First name must be at least 2 characters long." })
  firstName!: string;

  @IsString({ message: "Last name must be valid string." })
  @MaxLength(200, { message: "Last name cannot exceed 200 characters." })
  @MinLength(2, { message: "Last name must be at least 2 characters long." })
  lastName!: string;

  @IsEmail()
  email!: string;

  @IsStrongPassword(
    { minLength: 8, minUppercase: 1, minNumbers: 1, minSymbols: 1 },
    { message: "Password must be at least 8 characters and 1 uppercase, a 1 number, and 1 symbol." }
  )
  password!: string;

  @IsConfirmPassword('password', {
    message: 'Passwords do not match',
  })
  confirmPassword!: string;
}
