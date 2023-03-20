import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  name?: string;
  subject?: string;
  message?: string;
  sendEmail(e: Event, myForm: NgForm) {
    emailjs
      .sendForm(
        'service_srdv5ya',
        'template_vrg1ask',
        e.target as HTMLFormElement,
        'b5LIF8_LnoPZUGuEv'
      )
      .then(
        (result: EmailJSResponseStatus) => {
          console.log(result.text);
          myForm.reset(); // reset the form
        },
        (error) => {
          console.log(error.text);
        }
      );
  }
}
