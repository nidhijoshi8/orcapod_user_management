import { CreateUserDto } from "./CreateUserDto"
import {PartialType} from "@nestjs/mapped-types"

export class UpdateUserDto extends PartialType(CreateUserDto){ }