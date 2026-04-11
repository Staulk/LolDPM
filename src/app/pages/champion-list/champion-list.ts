import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { DataDragon } from '../../services/data-dragon';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-champion-list',
  imports: [ReactiveFormsModule],
  templateUrl: './champion-list.html',
  styleUrl: './champion-list.css'
})
export class ChampionList implements OnInit {

  private dataDragon = inject(DataDragon);

  allChampions: any[] = [];
  filteredChampions: any[] = [];
  searchControl = new FormControl<string>('', { nonNullable: true });
  loading: boolean = true;

  ngOnInit() {
    this.dataDragon.getChampionsMap().subscribe(() => {
      this.allChampions = Object.values(this.dataDragon.championsMap).map((name: any) => ({
        name,
        imageUrl: this.dataDragon.getChampionImageUrl2(name)
      })).sort((a, b) => a.name.localeCompare(b.name));

      this.filteredChampions = [...this.allChampions];
      this.loading = false;
    });

    this.searchControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.filteredChampions = this.allChampions.filter(champ =>
        champ.name.toLowerCase().includes(value.toLowerCase())
      );
    });
  }
}