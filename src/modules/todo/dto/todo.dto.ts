import { MaxLength, MinLength } from "class-validator";

export class NewTodoDto {
    @MaxLength(300)
    @MinLength(1)
    content: string;
}
