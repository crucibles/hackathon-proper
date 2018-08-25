// Core imports
import {
    Component,
    OnInit
} from '@angular/core';


@Component({
    selector: 'log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

    constructor(
    ) {

    }

    ngOnInit() {
        console.log("hello");
    }

    login() {
        /*
            Insert log-in code here
        */
    }

}
