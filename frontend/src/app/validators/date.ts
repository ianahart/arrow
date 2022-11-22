import {Validator, AbstractControl, FormGroup, ValidationErrors} from "@angular/forms";
import {Injectable} from "@angular/core";


@Injectable({
    providedIn: 'root'
})

export class Date implements Validator {

    validate(formControl: AbstractControl): ValidationErrors | null {
        let value = formControl.value;
        console.log(value)
        if (value && typeof value === "string") {
            let match = value.match(/^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/);

            if (!match) {
                return {'dateInvalid': true};
            } else if (match && match[0] !== value) {
                return {'dateInvalid': true};
            }
        }
        return null
    }

}

