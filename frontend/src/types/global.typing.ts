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
  roleId: string;
}

export interface IProject {
  id: string;
  name: string;
  description: string;
  dateCreated: string;
  managerId: string;
}

export interface ICreateProjectDto {
  name: string;
  description: string;
  managerId: string;
}

export interface ITicket {
  id: string;
  title: string;
  description: string;
  dateCreated: string;
  status: string;
  type: string;
  priority: string;
  projectId: string;
  projectName:string;
}

