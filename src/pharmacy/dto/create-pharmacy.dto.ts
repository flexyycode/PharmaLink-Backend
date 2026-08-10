import { IsDate, IsDateString, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";
import { SubscriptionDuration, SubscriptionType } from "generated/prisma/enums";


export class CreatePharmacyDto {  
    @IsString() 
    @IsNotEmpty()
    name: string;  

    @IsString()
    @IsNotEmpty()
    licenseId: string; 

    @IsEmail() 
    @IsNotEmpty() 
    contactEmail: string;  

    @IsString()
    @IsNotEmpty() 
    password: string;

    @IsString()
    phone: string; 

    @IsString()
    street: string; 

    @IsString()
    city: string; 

    @IsString()
    state: string; 
    
    @IsEnum(SubscriptionType) 
    subscriptionType: SubscriptionType;  

    @ValidateIf((o) => o.subscriptionType === SubscriptionType.PAID)
    @IsEnum(SubscriptionDuration) 
    duration?: SubscriptionDuration; 

    @ValidateIf((o) => o.subscriptionType === SubscriptionType.FREE_TRIAL)
    @IsDateString()
    expiryDate?: string;

    @IsDateString() 
    @IsOptional() 
    startDate?: string; 
}