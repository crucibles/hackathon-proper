//Core Imports
import {
    Component,
    OnInit
} from '@angular/core';

import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';

import {
    Router
} from '@angular/router';

//Application Imports
import {
    UserService
} from '../shared/services/user.service';
import { ToastsManager } from 'ng2-toastr';

@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
    private signupForm: FormGroup;
    // To determine the a duplicate email upon input.
    duplicate: string = null;

    constructor(
        formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        private toastr: ToastsManager
    ) {
        this.signupForm = formBuilder.group({
            firstName: null,
            middleName: null,
            lastName: null,
            birthdate: null,
            // Validates the format of the email input.
            email: [null, Validators.email],
            password: null,
            confirmPassword: null,
            contactNumber: null,
            monkeyName: null
        });
        this.duplicate = null;
    }

    submit() {
        let firstName = this.signupForm.value.firstName;
        let middleName = this.signupForm.value.middleName;
        let lastName = this.signupForm.value.lastName;
        let birthdate = this.signupForm.value.birthdate;
        let email = this.signupForm.value.email;
        let password = this.signupForm.value.password;
        let contactNumber = this.signupForm.value.contactNumber;
        let monkeyName = this.signupForm.value.monkeyName;


        this.userService.register(
            firstName,
            middleName,
            lastName,
            birthdate,
            email,
            password,
            contactNumber,
            monkeyName
        ).subscribe(newUser => {
            if (newUser) {
                // Successful registration of user and redirects to login page.
                this.router.navigate(['/log-in']);
                this.toastr.success("Try logging in!", "Account created!");
            } else {
                // Unsuccessful registration of new user because of email already existing.
                // Sets signal to prompt warning message of already existing email.
                this.toastr.warning("This email has already have an account", "Failed to register");
                this.duplicate = email;
            }
        });
    }

    // Resets the form inputs and the duplicate email warning signal.
    reset() {
        this.duplicate = null;
        this.signupForm.reset();
    }

    userLogin() {
        this.router.navigate(['/log-in']);
    }

    get firstName() {
        return this.signupForm.get('firstName') as FormControl;
    }

    get middleName() {
        return this.signupForm.get('middleName') as FormControl;
    }

    get lastName() {
        return this.signupForm.get('lastName') as FormControl;
    }

    get birthdate() {
        return this.signupForm.get('birthdate') as FormControl;
    }

    get email() {
        return this.signupForm.get('email') as FormControl;
    }

    get password() {
        return this.signupForm.get('password') as FormControl;
    }

    get confirmPassword() {
        return this.signupForm.get('confirmPassword') as FormControl;
    }

    get contactNumber() {
        return this.signupForm.get('contactNumber') as FormControl;
    }

    get monkeyName() {
        return this.signupForm.get('monkeyName') as FormControl;
    }

    ngOnInit() {

    }
}