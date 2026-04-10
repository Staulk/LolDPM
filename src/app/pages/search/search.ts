import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  imports: [ReactiveFormsModule],
  templateUrl: './search.html',
  styleUrl: './search.css',
})
export class Search {

  private router = inject(Router);

  searchForm = new FormGroup({
    gameName: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3)]
    }),
    tagLine: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(2)]
    })
  });

  onSearch() {
    if (this.searchForm.valid) {
      const gameName = this.searchForm.controls.gameName.value;
      const tagLine = this.searchForm.controls.tagLine.value;
      this.router.navigate(['/summoner', 'euw', gameName, tagLine]);
    }
  }
}
