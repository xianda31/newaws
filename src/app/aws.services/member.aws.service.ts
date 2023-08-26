import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { APIService, Member } from '../API.service';

@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private _members: Member[] = [];
  _members$: BehaviorSubject<Member[]> = new BehaviorSubject<Member[]>(this._members);

  constructor(
    private api: APIService,
  ) {

    // READ ALL CATEGORIES

    this.api.ListMembers().then((result) => {
      this._members = result.items as Member[];
      this._members$.next(this._members);
    });

  }

  get members$(): Observable<Member[]> {
    return this._members$ as Observable<Member[]>;
  }

  // C(R)UD CATEGORIES


  createMember(member: Member) {

    this.api.CreateMember(member).then((result) => {
      const member = result as Member;
      this._members.push(member);
      this._members$.next(this._members);
    })
      .catch((error) => { console.log('Error creating member: ', error); });
  }




  updateMember(member: Member) {
    this.api.UpdateMember(member).then((result) => {
      this._members = this._members.map((cat) => cat.id === member.id ? member : cat);
      this._members$.next(this._members);
    })
      .catch((error) => { console.log('Error updating member: ', error); });

  }


  deleteMember(member: Member) {
    this.api.DeleteMember({ id: member.id }).then((result) => {
      this._members = this._members.filter((cat) => cat.id !== member.id);
      this._members$.next(this._members);
    })
      .catch((error) => {
        console.log('Error deleting member: ', error);
      });
  }



  getMemberByLicense(license: string): Member | null {
    return this._members.find((member) => member.license === license) || null;
  }


}
