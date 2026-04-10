import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DataDragon } from '../../services/data-dragon';

@Component({
  selector: 'app-champion-list',
  imports: [ReactiveFormsModule],
  templateUrl: './champion-list.html',
  styleUrl: './champion-list.css',
})
export class ChampionList implements OnInit {

  dataDragon = inject(DataDragon);

  searchControl = new FormControl('');
  allChampions: any[] = [];
  filteredChampions: any[] = [];
  loading = true;

  ngOnInit() {
    this.dataDragon.getAllChampions().subscribe({
      next: (champions) => {
        this.allChampions = champions.sort((a: any, b: any) => a.name.localeCompare(b.name));
        this.filteredChampions = this.allChampions;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });

    this.searchControl.valueChanges.subscribe(value => {
      const search = (value ?? '').toLowerCase();
      this.filteredChampions = this.allChampions.filter(c =>
        c.name.toLowerCase().includes(search)
      );
    });
  }
}
