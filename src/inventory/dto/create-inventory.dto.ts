import { IsDateString, IsNotEmpty, IsNumber, IsPositive, IsString, Min } from "class-validator";

export class CreateInventoryDto {
    @IsString() 
    @IsNotEmpty()
    drugName!: string;  

    @IsString() 
    @IsNotEmpty()
    genericName!: string; 

    @IsString() 
    @IsNotEmpty() 
    category!: string; 

    @IsNumber() 
    @Min(0) 
    quantity!: number; 

    @IsString() 
    @IsNotEmpty()
    batchNumber!: string; 

    @IsDateString() 
    expiryDate!: string; 

    @IsNumber() 
    @IsPositive() 
    price!: number; 
}