import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { delay, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class EmailValidator implements AsyncValidator {
  constructor() { }
  validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
    const email = control.value

    const httpCallObservable = new Observable<ValidationErrors|null>( subscriber => {
      if(email === 'nestordaniel@gmail.com'){
        subscriber.next({emailTaken: true})
        subscriber.complete()
      }

      subscriber.next(null)
      subscriber.complete()

    }).pipe(delay(2000))
    return httpCallObservable
  }

}
