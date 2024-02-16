import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

export function noWhitespaceValidator(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
  return new Promise<ValidationErrors | null>((resolve) => {
    const hasWhitespace = /^\s*$/.test(control.value || '');
    resolve(hasWhitespace ? { 'whitespace': true } : null);
  });
}
