import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { EditMealService } from 'src/app/services/edit-meal.service';

@Component({
  selector: 'app-meal-info',
  templateUrl: './meal-info.component.html',
  styleUrls: ['./meal-info.component.scss'],
})
export class MealInfoComponent implements OnInit {
  mealForm = this.fb.group({
    name: [null, Validators.required],
    description: null,
    size: [null, Validators.required],
    price: [null, Validators.required],
    cost: null,
    cover: null,
  });
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private editMealService: EditMealService
  ) {
    this.route.params.subscribe((params) => {
      if (params.mealId != 'add') {
        editMealService.getMeal(params.mealId).subscribe((e) => {
          this.mealForm.setValue({
            name: e?.name,
            description: e?.description,
            size: e?.size,
            price: e?.price,
            cost: e?.cost,
            cover: e?.cover,
          });
          console.log(this.mealForm.value);
          this.upload = e?.cover;
        });
      }
    });
  }
  ngOnInit(): void {}

  msg = '';
  upload: any;
  selectedFile!: File;

  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    if (!event.target.files[0] || event.target.files[0].length == 0) {
      this.msg = 'You must select an image';
      return;
    }

    var mimeType = event.target.files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.msg = 'Only images are supported';
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = (_event) => {
      this.msg = '';
      this.upload = reader.result;
    };
  }

  async onSubmit() {
    alert('Thanks!');
    if (this.selectedFile != undefined) {
      const { task, fileRef } = this.editMealService.uploadFile(
        this.selectedFile
      );
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.mealForm.get('cover')?.setValue(url);
              console.log(this.mealForm.value);
              this.editMealService.addMeal(this.mealForm.value);
              console.log('upload');
            });
          })
        )
        .subscribe();
    } else {
      this.editMealService.addMeal(this.mealForm.value);
      console.log('no upload');
    }
  }
}
