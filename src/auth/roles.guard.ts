import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
import { ROLES_KEY } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
        context.getHandler,
        context.getClass,
      ]);
      console.log(requiredRoles)
      if (!requiredRoles) {
        return true;
      }
      const req = context.switchToHttp().getRequest();
      const authHeader = req.headers.authorization;
      const bearer = authHeader.split(" ")[0];
      const token = authHeader.split(" ")[1];
      if (bearer !== "Bearer" || !token) {
        console.log("unauthorized attempt");
        throw new UnauthorizedException({ message: "User is not authorised." });
      }
      const user = await this.jwtService.verify(token);
      req.user = user;
      return user.roles.some(role => requiredRoles.include(role.value));
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({ message: "User is not authorised!" });
    }
  }
}
