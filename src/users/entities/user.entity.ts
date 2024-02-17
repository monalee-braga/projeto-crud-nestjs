import { Permission } from "../enums/permission.enum";

export class User {
  id?: string;
  email: string;
  password: string;
  name: string;
  permission: Permission;
  phone: string;
}