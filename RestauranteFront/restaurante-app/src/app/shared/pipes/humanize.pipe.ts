import { ValidationErrors } from '@angular/forms'
import { Pipe, Inject, PipeTransform } from '@angular/core'
import { FORM_ERRORS } from './FORM_ERRORS'

@Pipe({ name: 'humanizeFormMessages' })
export class HumanizeFormMessagesPipe implements PipeTransform {
  
  constructor(@Inject(FORM_ERRORS) private messages) { }

  transform(
    validationErrors: ValidationErrors,
    controlName: string,
    overriddenMessages: {} = {}
  ) {
    if (!validationErrors) {
      return ''
    }

    // Allow the possibility to override messages
    const messages = {
      ...this.messages,
      ...overriddenMessages,
    }

    const messageKey = Object.keys(validationErrors)[0]
    const getMessage = messages[messageKey];
    
    const text = getMessage
    ? getMessage({...validationErrors[messageKey], controlName: controlName})
    : (controlName ? `${controlName} inválido` : 'Campo inválido');

    return text;
    
  }
}