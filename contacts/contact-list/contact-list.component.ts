import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ContactService } from '../shared/contact.service';
import { Contact } from '../shared/contact';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {

  constructor(private contactService: ContactService, private toastrService: ToastrService) { }

  // search
  filter: string;
  clearSearch() {
    this.filter = null
  }

  //sorting
  key: string = 'FirstName';  
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  // paging
  p: number = 1;  

  ngOnInit() {
    this.contactService.getContacts();
  }
  showForEdit(contact: Contact){
    this.contactService.contact = Object.assign({}, contact);
  }
  onDelete(id: number){
    if(confirm('Delete contact?')==true){
      this.contactService.deleteContact(id).subscribe(x => {
        this.toastrService.warning('Contact deleted successfully');
        this.contactService.getContacts();
        this.contactService.resetContact();
      })
    }
  }

}
