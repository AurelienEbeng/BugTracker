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
  projectName: string;
}

export interface ICreateTicketDto {
  title: string;
  description: string;
  dateCreated: string;
  status: string;
  type: string;
  priority: string;
  projectId: string;
}

export interface ITicketAttachment {
  id: string;
  notes: string;
  fileUrl: string;
  ticketId: string;
  ticketTitle: string;
  uploaderId: string;
  uploaderName: string;
}

export interface ICreateTicketAttachmentDto {
  notes: string;
  ticketId: string;
  uploaderId: string;
}

export interface ITicketComment {
  id: string;
  message: string;
  dateCreated: string;
  ticketId: string;
  ticketTitle: string;
  commenterId: string;
  commenterName: string;
}

export interface ICreateTicketCommentDto {
  message: string;
  dateCreated: string;
  ticketId: string;
  commenterId: string;
}

export interface ITicketHistory {
  id: string;
  oldValue: string;
  newValue: string;
  dateModified: string;
  property: string;
  ticketId: string;
  ticketTitle: string;
  employeeId: string;
  employeeName: string;
}
export interface ICreateTicketHistory {
  oldValue: string;
  newValue: string;
  dateModified: string;
  property: string;
  ticketId: string;
  employeeId: string;
}

export interface ISignIn{
  username: string;
  password: string;
  rememberMe: boolean;
}

