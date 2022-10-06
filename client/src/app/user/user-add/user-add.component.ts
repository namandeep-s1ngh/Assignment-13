import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/customer/customer.service';
import { RoleService } from 'src/app/role.service';
import { Role, role } from 'src/app/role.model';
import { customerModel } from 'src/app/customer/customer.model';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit {

  @Output () updatedData = new EventEmitter();
  addUserForm: FormGroup;
  addButtonClicked = false;
  role = Role;
  customers: customerModel[];

  constructor(private userService: UserService,private customerService: CustomerService, private roleService: RoleService) { }

  ngOnInit(): void {
    this.customerService.getCustomer().subscribe(newData=>{
      this.customers = newData;
    });
    this.addUserForm = new FormGroup({
      'firstName': new FormControl(null,[Validators.required]),
      'middleName':new FormControl(''),
      'lastName':new FormControl(null,[Validators.required]),
      'email':new FormControl(null,[Validators.required,Validators.email]),
      'phoneNumber':new FormControl(null,[Validators.required]),
      'customerId':new FormControl(null,[Validators.required]),
      'roleId':new FormControl(null,[Validators.required,this.forbiddenNames.bind(this)]),
      'address':new FormControl(null,[Validators.required])
    })
  }

  onSubmit(){
    if(this.addUserForm.status === "INVALID"){
      this.addButtonClicked = true;
      return;
    }
    else{
      this.addButtonClicked = false;
      let role:role;
      this.roleService.getRole().subscribe(response=>{
        response.map(data=>{
          if(data.name==this.addUserForm.value.roleId){
            role=data;
          }
        })
        let userFormData = this.addUserForm.value;
        userFormData['roleId']=role.id;
        console.log(userFormData);
        this.userService.addUser(userFormData).subscribe(responseData=>{
          this.addUserForm.reset();
          this.updatedData.emit();
        })
      })
    }
  }

  forbiddenNames(control: FormControl): {[s: string]: boolean}|null {
    if (control.value in this.role) {
      return null;
    }
    else{
      return {'roleIsForbidden': true};
    }
  }

}
