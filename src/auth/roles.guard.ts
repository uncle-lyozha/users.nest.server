import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { JwtService } from "@nestjs/jwt";
import { Roles } from "./roles-auth.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const requiredRoles = this.reflector.get(Roles, context.getHandler());
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
      return user.roles.some(role => requiredRoles.includes(role.value));
    } catch (e) {
      console.log(e);
      throw new UnauthorizedException({ message: "User is not authorised!" });
    }
  }
}
