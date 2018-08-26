//Core Imports
import {
    HttpClient,
    HttpParams
} from '@angular/common/http';

import {
    Injectable
} from '@angular/core';

import {
    Router
} from '@angular/router';

//Third-Party Imports
import {
    Observable
} from 'rxjs/Observable';

import {
    of
} from 'rxjs/observable/of';

import {
    catchError,
    map,
    tap
} from 'rxjs/operators';
import { User } from '../models/user';


@Injectable()
export class UserService {

    private userUrl = 'api/users';    // URL to: server/routes/api.js for users
    private loginUrl = 'api/login';   // URL to: server/routes/api.js for login
    private signupUrl = 'api/signup'; // URL to: server/routes/api.js for sign up
    currentUser: any;
    cookieService: any;

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
    }

    /**
     * @summary: Edit existing user from server
     */
    editUser(id: string) {
        const url = this.userUrl;
    }

    getCurrentUser(): User {
        return this.currentUser;
    }

    setCurrentUser(user: User) {
        this.cookieService.delete('currentUser');
        localStorage.removeItem('currentUser');
        this.currentUser = new User(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.cookieService.set('currentUser', this.currentUser.getUserEmail());
    }

    /**
     * @summary: Obtains a user from server by id
     * @author Cedric Yao Alvaro
     * @returns {User}
     */
    getUser(id: string): any {
        const url = this.userUrl;
        let params = new HttpParams().set('id', id);
        return this.http.get<User>(url, {
            params: params
        })
            .pipe(
                map(users => users[0]), // returns a {0|1} element array
                tap(h => {
                    const outcome = h ? 'fetched user ' + id : 'did not find user ' + id;
                    return new User(h);
                }),
                catchError(this.handleError<User>(`getUser user_id=${id}`))
            );
    }

    /**
     * Lets the user log in (if user enters valid email and password) and be able to navigate to the correct pages
     * @param email email input of the user logging in
     * @param password password input of the user logging in
     */
    logIn(email: string, password: string): Observable<User> {

        const url = this.loginUrl;

        let body = {
            user_email: email,
            user_password: password
        }

        return this.http.post(url, body).pipe(
            tap(data => {
                const outcome = data ? 'fetched user ' + email : 'did not find user ' + email;
                if (data) {
                    this.currentUser = new User(data);
                    localStorage.setItem('currentUser', JSON.stringify(data));
                }
                return data;
            }),
            catchError(this.handleError<any>(`logIn user_email=${email}`))
        );
    }

    /**
     * Logs out the user
     * add subscribe when have server side
     * and when it is observable
     */
    logOut() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('currentUserSections');
        localStorage.removeItem('currentInstructorSections');
        this.cookieService.delete('currentUser');
        this.router.navigate(['/log-in']);
    }

    /**
     * Registers the received user parameter to the database 
     * @param user user to be registered to the database
     */
    register(
        firstName: string,
        middleName: string,
        lastName: string,
        birthdate: string,
        email: string,
        password: string,
        contactNumber: string,
        monkeyName: string
    ): Observable<User> {
        // The sign up api URL.
        const url = this.signupUrl;

        return this.http.post<User>(url, {
            firstName,
            middleName,
            lastName,
            birthdate,
            email,
            password,
            contactNumber,
            monkeyName
        }).pipe(
            tap(data => {
                // Returns data from api.js to sign-up.component.ts.
                return data;
            }),
            catchError(this.handleError<User>(`signup user_email=${email}`))
        );
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T>(operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

}
