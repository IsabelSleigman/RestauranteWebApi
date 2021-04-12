import { InjectionToken } from '@angular/core';


export const defaultErrors = {
  // required: (error) => `This field is required`,
  required: ({controlName}) => controlName ? `${controlName} é obrigatório` : `Campo obrigatório`,
  pattern: (error) => `Formato inválido`,
  minlength: ({ requiredLength, actualLength }) => `Esperava ${requiredLength} mas obteve ${actualLength} caracteres`,
  maxlength: ({ requiredLength, actualLength }) => `Esperava ${requiredLength} mas obteve ${actualLength} caracteres`,
  min: ({ min, actual }) => `Valor mínimo é ${min}`,
  max: ({ max, actual }) => `Valor máximo é ${max}`
}

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
  providedIn: 'root',
  factory: () => defaultErrors
});