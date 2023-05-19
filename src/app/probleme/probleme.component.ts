import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LongueurMinimumComponent } from '../shared/longueur-minimum/longueur-minimum.component';
import { ITypeProbleme } from './ITypeProbleme';
import { IProbleme } from './IProbleme';
import { TypeproblemeService } from './typeprobleme.service';
import { EmailMatcherComponent } from '../shared/email-matcher/email-matcher.component';
import { ProblemeServices } from './probleme.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'Inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css']
})
export class ProblemeComponent implements OnInit {

  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;
  probleme: IProbleme;

  constructor(private fb: FormBuilder, private typeproblemeService: TypeproblemeService, private problemeService: ProblemeServices, private route: Router ) { }

  ngOnInit() {
    this.problemeForm = this.fb.group({
      prenom: ['', [LongueurMinimumComponent.longueurMinimum(3), Validators.required]],
      nom: ['', [LongueurMinimumComponent.longueurMinimum(3), Validators.required]],
      noTypeProbleme: ['', Validators.required],
      
      courrielGroup: this.fb.group({
        courriel: [{ value: '', disabled: true }],
        courrielConfirmation: [{ value: '', disabled: true }],
      }), 

      telephone: [{ value: '', disabled: true }],
      notification: ['pasnotification'],
      descriptionProbleme:['',[ LongueurMinimumComponent.longueurMinimum(5),Validators.required]],
      noUnite:'',
      dateProbleme:{value:Date(), disabled:true}
    });

    this.typeproblemeService.obtenirTypesProbleme()
      .subscribe(probleme => this.typesProbleme = probleme,
        error => this.errorMessage = <any>error);
    this.problemeForm.get('notification').valueChanges.subscribe(value => this.appliquerNotifications(value));

  }


  appliquerNotifications(typeNotifications: string): void {
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get('courrielGroup.courrielConfirmation');
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    const telephoneControl = this.problemeForm.get('telephone');
    // Tous remettre à zéro

    courrielGroupControl.clearValidators();
    courrielGroupControl.reset();  // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielGroupControl.disable();

    courrielControl.clearValidators();
    courrielControl.reset();
    courrielControl.disable();

    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();

    telephoneControl.clearValidators();
    telephoneControl.reset();
    telephoneControl.disable();

   

    if (typeNotifications === 'courriel') {
      courrielGroupControl.setValidators([Validators.compose([EmailMatcherComponent.courrielDifferents()])])
      courrielGroupControl.enable();
      courrielControl.setValidators([Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+')]);
      
      courrielControl.enable();
      courrielConfirmationControl.setValidators([Validators.required]);
      courrielConfirmationControl.enable();
    }
    if (typeNotifications === 'telephone') {
      telephoneControl.setValidators([Validators.pattern('[0-9]+'), Validators.minLength(10), Validators.maxLength(10), Validators.required]);
      telephoneControl.enable();
    }


    courrielControl.updateValueAndValidity();
    courrielConfirmationControl.updateValueAndValidity();
    telephoneControl.updateValueAndValidity();
  }
  
  save(): void {
    if (this.problemeForm.dirty && this.problemeForm.valid) {
        // Copy the form values over the problem object values
        this.probleme = this.problemeForm.value;
        this.probleme.id = 0;
        // Courriel est dans un groupe alors que this.probleme n'a pas de groupe.  Il faut le transférer explicitement.
         if(this.problemeForm.get('courrielGroup.courriel').value != '')
        {
          this.probleme.courriel = this.problemeForm.get('courrielGroup.courriel').value;
        }
    
        this.problemeService.saveProbleme(this.probleme)
            .subscribe({
              next: () => this.onSaveComplete(),
              error: err => this.errorMessage = err
          })
    } else if (!this.problemeForm.dirty) {
        this.onSaveComplete();
    }
  }
  onSaveComplete(): void {
  // Reset the form to clear the flags
  this.problemeForm.reset();  // Pour remettre Dirty à false.  Autrement le Route Guard va dire que le formulaire n'est pas sauvegardé
  this.route.navigate(['/accueil']);
}
  
}



 // if (typeNotifications === 'pasnotification') {
    //   //         dateCommandeControl.setValidators([Validators.required]);      
    //   //         dateCommandeControl.enable();  
    //   //         dateExpeditionControl.setValidators([Validators.required]);              
    //   //         dateExpeditionControl.enable();  
    //   //         // Si le validateur est dans un autre fichier l'écire sous la forme suivante : 
    //   //         // ...Validators.compose([classeDuValidateur.NomDeLaMethode()])])
    //   //          datesGroupControl.setValidators([Validators.compose([datesValides])]); 
    //   courrielGroupControl.clearValidators();
    //   courrielGroupControl.reset();
    //   courrielGroupControl.disable();

    //   courrielControl.clearValidators();
    //   courrielControl.reset();
    //   courrielControl.disable();

    //   courrielConfirmationControl.clearValidators();
    //   courrielConfirmationControl.reset();
    //   courrielConfirmationControl.disable();

    //   telephoneControl.clearValidators();
    //   telephoneControl.reset();
    //   telephoneControl.disable();
    // }
    //   else
    //   {
    //     if(typeNotifications === 'Inconnu')
    //     {
    //       dateCommandeControl.setValidators([Validators.required]);      
    //       dateCommandeControl.disable();           
    //     }
    //   }