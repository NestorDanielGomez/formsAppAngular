import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './dynamic-page.component.html',
  styles: []
})
export class DynamicPageComponent {

  public myForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    favoriteGames: this.fb.array([
      ['Star Wars', Validators.required ],
      ['Fifa24', Validators.required ],
    ])
  })

  public newFavorite: FormControl = new FormControl('', [Validators.required])

  constructor(private fb: FormBuilder){}

  get favoriteGames(){
    return this.myForm.get('favoriteGames') as FormArray
  }

  isInvalidField(field: string): boolean | null{
    return this.myForm.controls[field].errors && this.myForm.controls[field].touched
  }

  isInalidFieldInArray(formArray: FormArray, i: number){
    return formArray.controls[i].errors && formArray.controls[i].touched
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

  addToFavorite():void{
    if(this.newFavorite.invalid) return
    console.log(this.newFavorite.value)
    const newFavoriteGame = this.newFavorite.value
    this.favoriteGames.push(this.fb.control(newFavoriteGame, Validators.required))
    this.newFavorite.reset()
  }

  onDeleteFavorite (i:number):void {
    this.favoriteGames.removeAt(i)
  }


  onSubmit(): void {
    if(this.myForm.invalid){
      this.myForm.markAllAsTouched()
      return
    }
  (this.myForm.controls['favoriteGames'] as FormArray) = this.fb.array([])
  this.myForm.reset()
  }
}
