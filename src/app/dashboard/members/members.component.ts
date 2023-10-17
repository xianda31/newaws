import { Component, OnInit } from '@angular/core';
import { memberTableColumns } from './members.table.definition';
import { Observable } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Member } from 'src/app/API.service';
import { MemberService } from 'src/app/aws.services/member.aws.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  columns = memberTableColumns;
  displayedColumns = this.columns.map(c => c.columnDef);


  members: Observable<Member[]> = this.memberService.members$;

  memberForm !: FormGroup;
  createMode: boolean = true;
  selectedMember!: Member;

  credentials: string = 'Publisher Admin Sales'; //

  constructor(
    private memberService: MemberService,
  ) { }

  ngOnInit(): void {


    this.memberForm = new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      license: new FormControl('', [Validators.required, Validators.pattern("^[0-9]*$")]),
      email: new FormControl('', [Validators.required, Validators.email]),
      rights: new FormControl('', [Validators.required]),
    })

  }

  // getters

  get firstname() { return this.memberForm.get('firstname')!; }
  get lastname() { return this.memberForm.get('lastname')!; }
  get license() { return this.memberForm.get('license')!; }
  get email() { return this.memberForm.get('email')!; }
  get rights() { return this.memberForm.get('rights')!; }


  selectMember(member: Member) {
    this.selectedMember = member;
    this.memberForm.patchValue(member);
    this.createMode = false;

  }


  // CRUD MEMBERS

  createMember() {

    if (this.memberForm.invalid) {
      this.memberForm.markAllAsTouched();
      return;
    }

    this.memberService.createMember(this.memberForm.value);
    this.createMode = true;
    this.memberForm.reset();
  }





  updateMember() {

    if (this.memberForm.invalid) {
      this.memberForm.markAllAsTouched();
      return;
    }

    let newMember = this.memberForm.value;
    newMember.id = this.selectedMember.id;
    this.memberService.updateMember(this.memberForm.value);
    this.memberForm.reset();
    this.rights.patchValue('');   // comprends pas pourquoi il faut faire ça pour que le select soit vide
    this.createMode = true;
  }




  deleteMember(event: any, member: Member) {
    event.stopPropagation();
    this.memberService.deleteMember(member);
    this.memberForm.reset();
    this.createMode = true;
  }


  controlTextToUpperCase(controlname: string) {
    let obj = this.memberForm.controls[controlname].value.toUpperCase();
    this.memberForm.controls[controlname].patchValue(obj);
  }

  controlTextFirstLetterToUpperCase(controlname: string) {
    let str = this.memberForm.controls[controlname].value;
    str = (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase()
    });
    // console.log("%s -> %s", control.value, str)
    this.memberForm.controls[controlname].patchValue(str);
  }
}



