import { Member } from "src/app/API.service";

export const memberTableColumns = [
  // {
  //   columnDef: 'id',
  //   header: 'id',
  //   cell: (member: Member) => `${member.id}`,
  // },
  {
    columnDef: 'lastname',
    header: 'Nom',
    cell: (member: Member) => `${member.lastname}`,
  },
  {
    columnDef: 'firstname',
    header: 'Prénom',
    cell: (member: Member) => `${member.firstname}`,
  },
  {
    columnDef: 'license',
    header: 'N° licence',
    cell: (member: Member) => `${member.license}`,
  },
  {
    columnDef: 'email',
    header: 'email',
    cell: (member: Member) => `${member.email}`,
  },
  {
    columnDef: 'rights',
    header: 'droits',
    cell: (member: Member) => `${member.rights}`,
  },
  // {
  //   columnDef: 'adhesion',
  //   header: 'Adhésion',
  //   cell: (member: Member) => `${member.club_info.last_adhesion_date}`,
  // },
  // {
  //   columnDef: 'icon',
  //   header: 'couple',
  //   cell: (member: Member) => `${member.club_info.has_partner ? 'bi bi-people-fill' : 'bi bi-person-fill'}`,
  // },
  // {
  //   columnDef: 'icon',
  //   header: 'mémo',
  //   cell: (member: Member) => `${!member.club_info.post_it || member.club_info.post_it === '' ? '' : 'bi bi-sticky'}`,
  // },


];
