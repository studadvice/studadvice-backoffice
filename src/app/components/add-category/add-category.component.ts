import {Component, OnInit, ViewChild} from '@angular/core';
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ButtonComponent} from "../../core/input/button/button.component";
import {MatDialog} from "@angular/material/dialog";
import {FormControlService} from "../../shared/services/form-control.service";
import {faPlus, faSave, faTrash} from "@fortawesome/free-solid-svg-icons";
import {DataService} from "../../shared/dataservices/data.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-add-category',
    templateUrl: './add-category.component.html',
    styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
    form!: FormGroup;

    @ViewChild('addSubCategoryButton', {static: false}) addSubcategoryButton!: ButtonComponent;
    @ViewChild('submitButton', {static: false}) submitButton!: ButtonComponent;
    @ViewChild('removeSubCategoryButton', {static: false}) removeSubCategoryButton!: ButtonComponent;
    protected readonly faTrash = faTrash;
    protected readonly faPlus = faPlus;
    protected readonly faSave = faSave;

    constructor(private formBuilder: FormBuilder, public dialog: MatDialog,
                private formControlService: FormControlService,
                private dataService: DataService,
                public router: Router,
    ) {

    }

    get subcategories(): FormArray {
        return this.form.get('subcategories') as FormArray;
    }

    ngOnInit() {
        this.form = this.formBuilder.group({
            name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            description: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]],
            image: ['', [Validators.required]],
            subcategories: this.formBuilder.array([]),
        });
        this.formControlService.setForm(this.form);
    }

    submit() {
        if (this.form.valid) {
            this.dataService.addCategory(this.form.value).subscribe((response) => {
                this.router.navigate(['category']);
            });
        }
    }

    getControl(group: AbstractControl, controlName: string): FormControl {
        return this.formControlService.getControl(group, controlName);
    }

    getFormControl(name: string) {
        return this.formControlService.getFormControl(name);
    }

    hasError(controlName: string, errorName: string): boolean {
        return this.formControlService.hasError(controlName, errorName);
    }

    addSubCategory() {
        const subcategoryGroup = this.formBuilder.group({
            name: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            description: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(50)]),
            image: new FormControl('', [Validators.required]),
            demarche: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
        });
        this.subcategories.push(subcategoryGroup);
        this.addSubcategoryButton.enable();
    }

    removeSubcategory(index: number) {
        this.subcategories.removeAt(index);
        this.removeSubCategoryButton.enable();
    }
}
