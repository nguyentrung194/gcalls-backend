import { IsString, IsNumber } from 'class-validator';

export class CreateCallLogDto {
  @IsString()
  public phoneNumber: string;

  @IsString()
  public name: string;

  @IsNumber()
  public date: Date;

  @IsNumber()
  public duration: number;

  @IsString()
  public event: string;

  @IsString()
  public originator: string;

  @IsString()
  public from: string;
}

export class EditCallLogDto {
  @IsString()
  public phoneNumber: string;

  @IsString()
  public name: string;

  @IsNumber()
  public date: Date;

  @IsNumber()
  public duration: number;

  @IsString()
  public event: string;

  @IsString()
  public originator: string;

  @IsString()
  public from: string;
}
