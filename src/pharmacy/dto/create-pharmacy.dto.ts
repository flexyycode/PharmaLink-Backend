import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
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
    phone: string; 

    @IsString()
    address: string; 

    @IsString()
    city: string; 

    @IsString()
    state: string; 
    
    @IsString()
    location: string; 
    
    @IsEnum(SubscriptionType) 
    subscriptionType: SubscriptionType; 
    
    @IsEnum(SubscriptionDuration) 
    @IsOptional()
    duration? : SubscriptionDuration;   

    @IsDate() 
    @IsOptional() 
    startDate?: Date; 

    @IsDate() 
    @IsOptional() 
    expiryDate?: Date
}