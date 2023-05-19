import { Component } from '@angular/core';
import { AbstractControl, ValidatorFn } from '@angular/forms';
@Component({
  selector: 'Inter-email-matcher',
  templateUrl: './email-matcher.component.html',
  styleUrls: ['./email-matcher.component.css']
})

export class EmailMatcherComponent {
  static courrielDifferents(): ValidatorFn {
      return (c: AbstractControl): { [key: string]: boolean } | null => {
          if (!c['controls'].courriel.value || !c['controls'].courrielConfirmation.value) {
            return null;
          }
          return c['controls'].courriel.value === c['controls'].courrielConfirmation.value ? null : { match: true };
      };
  }   
}