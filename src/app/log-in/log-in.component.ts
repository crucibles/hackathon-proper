// Core imports
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
    Router, ActivatedRoute
} from '@angular/router';

// 3rd Party imports


import {
    ToastsManager
} from 'ng2-toastr';

import {
    User
} from '../shared/models/user';

// Application imports

import {
    UserService
} from '../shared/services/user.service';

@Component({
    selector: 'log-in',
    templateUrl: './log-in.component.html',
    styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
    public signupForm: FormGroup;

    isLoggingIn: boolean = false;
    returnUrl: string;
    private loginForm: FormGroup;
    warning: boolean;

    constructor(
        formBuilder: FormBuilder,
        private userService: UserService,
        private router: Router,
        private route: ActivatedRoute,
        private toastr: ToastsManager
    ) {
        this.loginForm = formBuilder.group({
            email: [null, Validators.email],
            password: null
        });
    }

    ngOnInit() {
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
        this.warning = false;
        this.isLoggingIn = false;
    }

    logIn() {
        let email = this.loginForm.value.email;
        let password = this.loginForm.value.password;
        this.isLoggingIn = true;
        this.userService.logIn(email, password)
            .subscribe(
                user => {
                    if (user) {
                        user = new User(user);
                        this.toastr.success("You are succesfully logged in!", "Welcome " + user.getUserFirstName());
                        this.router.navigateByUrl(this.returnUrl? this.returnUrl: user.getUserType()+'/home-page');
                    } else {
                        this.warning = true;
                        this.isLoggingIn = false;
                    }
                }, error => {
                    // login failed so display error
                    console.log("error");
                }
            );
    }

    keyPressed() {
        this.warning = false;
    }

    userSignUp() {
        this.toastr.success("Sign up now!");
        this.router.navigate(['/sign-up']);
    }

    get email() {
        return this.loginForm.get('email') as FormControl;
    }

    get password() {
        return this.loginForm.get('password') as FormControl;
    }
}
