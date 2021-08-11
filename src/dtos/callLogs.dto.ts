import { IsString, IsNumber } from 'class-validator';

export class CreateCallLogDto {
  @IsString()
  public phoneNumber: string;

  @IsNumber()
  public date: Date;

  @IsNumber()
  public duration: number;

  @IsNumber()
  public status: number;
}

export class EditCallLogDto {
  @IsString()
  public phoneNumber: string;

  @IsNumber()
  public date: Date;

  @IsNumber()
  public duration: number;

  @IsNumber()
  public status: number;
}
