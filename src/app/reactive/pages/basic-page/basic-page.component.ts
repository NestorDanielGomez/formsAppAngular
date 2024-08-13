import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

const defaultProduct = {
  name: "New App",
  price: 1500,
  inStorage: 6
}


@Component({
  selector: 'app-basic-page',
  templateUrl: './basic-page.component.html',
})
export class BasicPageComponent implements OnInit {

public myForm: FormGroup = this.fb.group({
  name: ['',[Validators.required, Validators.minLength(3)]],
  price: [0, [Validators.required, Validators.min(0)]],
  inStorage: [0, [Validators.required, Validators.min(0)]]
})

constructor( private fb: FormBuilder) {}
  ngOnInit(): void {
    this.myForm.reset(defaultProduct)
  }

  isInvalidField(field: string): boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  getFieldError(field: string): string | null {

    if(!this.myForm.controls[field] ) return null
    const errors = this.myForm.controls[field].errors || {}

    for (const key of Object.keys(errors)) {
      switch(key){
        case 'required':
          return 'Campo requerido'
        case 'minlength':
          return `Minimo de ${errors['minlength'].requiredLength} caracteres requeridos`
      }
    }
    return null
  }

  onSave():void {
    if(this.myForm.invalid) {
    this.myForm.markAllAsTouched()
    return
    }
    console.log(this.myForm.value)
    this.myForm.reset()
  }

}
