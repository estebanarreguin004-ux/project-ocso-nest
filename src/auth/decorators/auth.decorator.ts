import { applyDecorators, UseGuards } from "@nestjs/common";
import { Roles } from "./roles.decorator";
import { RolesGuard } from "../guards/roles.guard";
import { AuthGuard } from "../guards/auth.guard";
import { ROLES } from "../Constants/roles.constants";

export const Auth = (...roles: string[]) => {
    roles.push(ROLES.ADMIN);
    return applyDecorators(
        Roles(roles),
        UseGuards(AuthGuard, RolesGuard)
    )
}