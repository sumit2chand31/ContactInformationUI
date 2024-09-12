import { Component, Inject, OnInit, EventEmitter, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators,FormGroup,FormControl } from '@angular/forms';
import { MaterialModule } from '../../../../_module/Material.Module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Contactmodal, IContact } from '../../../../_model/ConatctVm';
import { CotactService } from '../../../../_services/cotact.service';
import { LoderService } from '../../../../_services/loder.service';
import { ToastrService, ToastNoAnimation } from 'ngx-toastr';

@Component({
  selector: 'app-add-contact',
  standalone: true,
  imports: [MaterialModule,ReactiveFormsModule],
  templateUrl: './add-contact.component.html',
  styleUrl: './add-contact.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AddContactComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    private ref: MatDialogRef<AddContactComponent>,
    private  _service:CotactService, @Inject(MAT_DIALOG_DATA) public data: any, private _loder:LoderService,
    private toastr: ToastrService){

  }

  conatctForm = this.formBuilder.group({
    id:this.formBuilder.control(0),
    firstname:this.formBuilder.control('', Validators.required),
    lastname:this.formBuilder.control('', Validators.required),
    email:this.formBuilder.control('', Validators.compose([Validators.required,Validators.email]))
  })



  title:string="Create";
  isedit:boolean=false;
  dialogdata: any;
  isErrorMessage:boolean=false;
  errorMessage!:string;
 submitted:Boolean = false;

  ngOnInit(): void {
    this.submitted=false;
    this.isErrorMessage =false;
    this.errorMessage= "";
    this.dialogdata = this.data;
    this.title = this.dialogdata.title;
    if(this.dialogdata.code >0){
      this.isedit=true;
      this.getContactById(this.dialogdata.code);

    }
  }

  getContactById(id:string){
    this._loder.setLoading(true);
    this._service.getById("Conatct/GetContactById/"+ id).subscribe((contact) => {
      if (contact.status) {
        this.editContactForm(contact.result);
      }else{
        this.isErrorMessage =true;
        this.errorMessage= contact.message;
      }
      this._loder.setLoading(false);
    });

  }
  editContactForm(data:any){
    this.conatctForm.get('id')?.setValue(data.id);
    this.conatctForm.get('firstname')?.setValue(data.firstName);
    this.conatctForm.get('lastname')?.setValue(data.lastName);
    this.conatctForm.get('email')?.setValue(data.email);
  }

  SaveConatct(){
    this.submitted=true;
    this._loder.setLoading(true);
    if(this.isedit== false){
      this.conatctForm.get('id')?.setValue(0);
      if(this.conatctForm.valid){
        const _obj: Contactmodal = {
          FirstName: this.conatctForm.value.firstname as string,
          LastName: this.conatctForm.value.lastname as string,
          Email: this.conatctForm.value.email as string
        }
        this._service.Create(_obj, "Conatct/AddContact").subscribe((client) => {
          debugger;
          if (client.status) {
              this. ClosePopup();
          }else{
            this.isErrorMessage =true;
            this.errorMessage= client.message;
          }
        });
    }else{

    }

    }else{
      if(this.conatctForm.valid){
        const _modal: IContact = {
          id: this.conatctForm.value.id as number,
          firstName: this.conatctForm.value.firstname as string,
          lastName: this.conatctForm.value.lastname as string,
          email: this.conatctForm.value.email as string
        }
        this._service.Update(_modal, "Conatct/UpdateContact").subscribe((client) => {
          if (client.status) {
              this. ClosePopup();
          }else{
            this.isErrorMessage =true;
            this.errorMessage= client.message;
          }
        });
    }
    }
    this._loder.setLoading(false);
  }

  ClosePopup() {
    this.conatctForm.reset();
    this.ref.close();
  }

  get f() {
    return this.conatctForm.controls;
  }
}
