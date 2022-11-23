import {Pipe, PipeTransform} from '@angular/core';

@Pipe({name: 'age'})
export class AgePipe implements PipeTransform {

    transform(dob: string, ...args: any[]) {
        const date = dob.split('/')
        const birthYear = parseInt(date[date.length - 1])

        const d = new Date()
        const age = d.getFullYear() - birthYear
        return age;

    }
}
