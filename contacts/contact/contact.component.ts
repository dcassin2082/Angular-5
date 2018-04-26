import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../shared/contact.service';
import { EmailValidator } from '@angular/forms';
import { UserService } from '../../user/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor(private router: Router, private userService: UserService, private contactService: ContactService, private toastrService: ToastrService) { }

  ngOnInit() {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form != null) {
      this.contactService.getContacts();
      form.reset();
    }
    this.contactService.contact = {
      ContactID: null,
      FirstName: '',
      LastName: '',
      EmailAddress: '',
      Phone: '',
      Company: ''
    }
  }
  onSubmit(form: NgForm) {
    if (form.value.ContactID == null) {
      form.value.ContactID = 0;
      this.contactService.postContact(form.value).subscribe(x => {
        this.toastrService.success('Contact added successfully', 'Contact');
        this.contactService.getContacts();
        this.resetForm(form);
      })
    }
    else {
      this.contactService.putContact(form.value.ContactID, form.value).subscribe(x => {
        this.toastrService.info('Contact updated successfully', 'Contact');
        this.contactService.getContacts();
        this.resetForm(form);
      })
    }
  }
}

/*
Usage
<input [mask]="'cep'" type="text" formControlName="zipCode">
Mask Types
brDate: '00/00/0000'
brTime: '00:00:00'
brDateTime: '00/00/0000 00:00:00'
cep: '00000-000'
brLandlinePhone: '(00) 0000-0000'
brCellPhone: '(00) 00000-0000'
phoneUs: '(000) 000-0000'
mixed: 'AAA 000-S0S'
cpf: '000.000.000-00'
cnpj: '00.000.000/0000-00'
money: '000.000.000.000.000,00'
money2: "#.##0,00"
ipAddress: '099.099.099.099'
percent: '##0,00%'
By default, you can define your own rule by following a list below:

'0': { pattern: /\d/ },
'9': { pattern: /\d/, optional: true },
'#': { pattern: /\d/, recursive: true },
'A': { pattern: /[a-zA-Z0-9]/ },
'S': { pattern: /[a-zA-Z]/ },
'Y': { pattern: /[0-9]/ }
Example:

<input [mask]="'(000) 900-0000'" type="text" formControlName="myControl">
*/