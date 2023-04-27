import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { UserService } from 'src/app/_services/user.service';

export interface User {
    "username": "string",
    "password": "string",
    "email": "string",
    "firstname": "string",
    "lastName": "string",
    "mobile": "string",
    "img": "string"

}


@Component({ templateUrl: 'add-edit-user.component.html' })
export class AddEditComponent implements OnInit {
    form!: FormGroup;
    id: any;
    isAddMode: boolean | undefined;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService
    ) { }

    ngOnInit() {
        this.id = this.route.snapshot.params['id'];
        console.log(this.id)
        this.isAddMode = !this.id;
        if (this.id) {
            this.userService.findUser(this.id).subscribe(data => {
                console.log(data)
                this.form.patchValue(data)
            })
        }

        // password not required in edit mode
        const passwordValidators = [Validators.minLength(6)];
        if (this.isAddMode) {
            passwordValidators.push(Validators.required);
        }

        this.form = this.formBuilder.group({
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            username: ['', Validators.required],
            email: ['', Validators.required],
            mobile: ['', Validators.required],
            password: ['']
        });

        if (!this.isAddMode) {
            // this.accountService.getById(this.id)
            //     .pipe(first())
            //     .subscribe(x => this.form.patchValue(x));
        }
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        if (this.isAddMode) {
            this.createUser(this.form.value);
        } else {
            console.log(this.id)
            this.updateUser(this.id, this.form.value);
        }
    }

    private createUser(data: any) {
        this.userService.createUser(data).subscribe(data => {
            console.log(data)
            this.router.navigate(['user'])
        })
    }

    private updateUser(id: string, data: any) {
        this.userService.updateUser(id, data).subscribe(data => {
            console.log(data)
            this.router.navigate(['user'])
        })
    }
}