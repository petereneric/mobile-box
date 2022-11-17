import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, ValidationErrors, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment.prod";
import {ConnApiService} from "../../../services/conn-api/conn-api.service";
import {HttpResponse} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {

  // Views
  @ViewChild('vName') vName;

  // Constants
  public maxInput = environment.maxInput;
  public maxInputMessage = environment.maxInputMessage;

  // Urls
  private urlTypes = 'types';
  private urlContact = 'mobile-box/contact'

  // fromGroup
  formGroup = this.formBuilder.group({
    cPrename: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
    cSurname: ['', [Validators.required, Validators.maxLength(this.maxInput)]],
    cName: ['', [Validators.maxLength(this.maxInput)]],
    cEmail: ['', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z0-9._%+-]{2,15}$'), Validators.maxLength(this.maxInput)]],
    cPhone: ['', [Validators.maxLength(this.maxInput)]],
    cMessage: ['', [Validators.required, Validators.maxLength(this.maxInputMessage)]],
  })

  // variables
  bSubmitted = false
  sizeMessage = 0
  bPrivate = false

  // data
  oType = null
  lTypes = null

  constructor(private router: Router, private connApi: ConnApiService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.connApi.get(this.urlTypes).subscribe((data: HttpResponse<any>) => {
      this.lTypes = data.body;
      console.log(this.lTypes)
    });

  }

  get errorControl() {
    return this.formGroup.controls;
  }

  onChangeMesssage() {
    if (this.formGroup.controls['cMessage'].value == null) {
      this.sizeMessage = 0;
    } else {
      this.sizeMessage = this.formGroup.controls['cMessage'].value.length;
    }
  }

  onPrivate($event: any) {
    this.bPrivate = $event['detail']['checked'];
  }

  onSend() {
    this.bSubmitted = true;

    // check for invalid input
    if (!this.formGroup.valid) {
      this.getFormValidationErrors();
      //this.alertInvalid();
      return;
    }

    // prepare data
    let message = {
      cSurname: this.formGroup.get("cSurname").value,
      cPrename: this.formGroup.get("cPrename").value,
      cEmail: this.formGroup.get("cEmail").value,
      cMessage: this.formGroup.get("cMessage").value,
      bPrivate: this.bPrivate ? 1 : 0,
      kType: this.oType != null ? this.oType.id : null,
      cType: this.oType != null ? this.oType.cName : null,
      cName: this.formGroup.get("cName").value !== "" ? this.formGroup.get("cName").value : null,
      cPhone: this.formGroup.get("cPhone").value !== "" ? this.formGroup.get("cPhone").value : null
    }

    // send request
    this.connApi.post(this.urlContact, message).subscribe((response: HttpResponse<any>) => {
      // Redirect to Thank you Page
      this.router.navigate(['/contact-sent'])
    }, error => {
      console.log(error)
    })
  }

  getFormValidationErrors() {
    Object.keys(this.formGroup.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.formGroup.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log('Key control: ' + key + ', keyError: ' + keyError + ', err value: ', controlErrors[keyError]);
        });
      }
    });
  }

  ngAfterViewInit() {
    this.vName.ionChange.subscribe(() => {
      this.vName.autoGrow = true;
    });
  }
}
