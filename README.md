# Functional Requirements for Bug Tracker

## User Authentication & Access
- The system must allow users to sign up for an account.
- The system must allow users to sign in with their credentials.
- The system must allow users to reset their password if forgotten.
- The system must allow visitors to sign in as demo users (Admin, Project Manager, or Developer).

## User Permissions & Roles
- Users can only view projects they have been assigned to.
- Only Admins can create new projects.
- Only Admins and Project Managers can update project details.
- Only Admins and Project Managers can assign or unassign users from a project.
- Only Admins and Project Managers can change the developer assigned to a ticket.
- Only the assigned Developer, Admin, or Project Manager can update a ticket.
- Only project members and Admins can:
  - Comment on project tickets
  - Add attachments to project tickets
  - Create new tickets within a project

## User Features
- Users must have access to a personal profile.
- Users must be able to view all their tickets across projects.
- Users must see notifications
- Users must have a dashboard displaying:
  - A graph of tickets by priority
  - A graph of tickets by type
  - A graph of tickets by status
<br>

# Use Case Diagram
<img width="450" height="1204" alt="use-case-diagram" src="https://github.com/user-attachments/assets/2e701c0e-efb0-4a35-bce0-ee85316792f0" />
<br>

# Database Entity Relationship Diagram
<img width="1140" height="2526" alt="db-entity-diagram" src="https://github.com/user-attachments/assets/28a78e94-2b3e-47fd-9e7e-9b4a4fd522ed" />
<br/>
<br/>

Checkout the demo on [LinkedIn](https://www.linkedin.com/posts/aurelien-ebeng_one-of-the-projects-i-worked-on-was-the-bug-activity-7414704595983110144-hgcD?utm_source=share&utm_medium=member_desktop&rcm=ACoAADozW_MBcloz7HwSCOFgmv6v6Oq8u5oY1Xk)
