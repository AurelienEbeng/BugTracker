export interface IRole {
  id: string;
  name: string;
}

export interface ICreateRoleDto {
  name: string;
}

export interface IEmployee {
  id: string;
  name: string;
  email: string;
  dateJoined: string;
  roleId: string;
}

export interface ICreateEmployeeDto {
  name: string;
  email: string;
  dateJoined: string;
  roleId: string;
}
