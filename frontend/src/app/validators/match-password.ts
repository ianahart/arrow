import {Validator, AbstractControl, FormGroup, ValidationErrors} from "@angular/forms";
import {Injectable} from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class MatchPassword implements Validator {

    validate(formGroup: AbstractControl): ValidationErrors | null {
        const {password, confirmPassword} = formGroup.value
        return password === confirmPassword ? null : {passwordDontMatch: true}
    }

}
