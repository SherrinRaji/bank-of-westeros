import { AbstractControl } from '@angular/forms';
import { ITS_JUST_ANGULAR } from '@angular/core/src/r3_symbols';
import { isNumber } from 'util';


export function NumericValidator(control: AbstractControl): { [key: string]: boolean } | null{
  if(isNumber(+control.value) && control.value > 0) {
    return { validamt: true };
  }
  return {validamt: false};
}