import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl } from '@angular/forms';

import { LongueurMinimumComponent } from './longueur-minimum.component';

describe('LongueurMinimumComponent', () => {
  let component: LongueurMinimumComponent;
  let fixture: ComponentFixture<LongueurMinimumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LongueurMinimumComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LongueurMinimumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('#7 | Une chaîne avec 10 espaces est invalide', () => {
    let control = { value: '          ' }
    let validatorFn = LongueurMinimumComponent.longueurMinimum(3);
    let result = validatorFn(control as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBeTruthy();
});

it('#8 | Une phrase avec des mots est valide', () => {
    let control = { value: 'Vive angular' }
    let validatorFn = LongueurMinimumComponent.longueurMinimum(3);
    let result = validatorFn(control as AbstractControl);
    expect(result).toBeNull();
});

it('#9 | Une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
    let control = { value: ' je le veux ' }
    let validatorFn = LongueurMinimumComponent.longueurMinimum(3);
    let result = validatorFn(control as AbstractControl);
    expect(result).toBeNull();
});
it('#10 | Une phrase avec 1 espace et 2 caractères est invalide.', () => {
    let control = { value: ' xx' }
    let validatorFn = LongueurMinimumComponent.longueurMinimum(3);
    let result = validatorFn(control as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBeTruthy();
});
it('#11 | Une phrase avec 2 espaces et 1 caractère est invalide', () => {
    let control = { value: ' x' }
    let validatorFn = LongueurMinimumComponent.longueurMinimum(3);
    let result = validatorFn(control as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBeTruthy();
});
it('#12 | Une phrase avec 3 espa0ces et 3 caractères est valide', () => {
    let control = { value: ' xxx' }
    let validatorFn = LongueurMinimumComponent.longueurMinimum(3);
    let result = validatorFn(control as AbstractControl);
    expect(result).toBeNull();
});
it('#13 | Une phrase avec 5 espaces, 5 caractères et 5 espaces est valide', () => {
    let control = { value: '     xxxxx     ' }
    let validatorFn = LongueurMinimumComponent.longueurMinimum(3);
    let result = validatorFn(control as AbstractControl);
    expect(result).toBeNull();
});
it('#14 | Une chaîne nulle est invalide', () => {
    let control = { value: '' }
    let validatorFn = LongueurMinimumComponent.longueurMinimum(3);
    let result = validatorFn(control as AbstractControl);
    expect(result['nbreCaracteresInsuffisant']).toBeTruthy();
});
});
