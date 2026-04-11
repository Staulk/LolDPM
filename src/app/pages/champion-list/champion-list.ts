import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime } from 'rxjs';
import { DataDragon } from '../../services/data-dragon';

// Interface pour l'affichage d'un champion dans la liste
interface ChampionDisplay {
  name: string;
  imageUrl: string;
}

@Component({
  selector: 'app-champion-list',
  imports: [ReactiveFormsModule],
  templateUrl: './champion-list.html',
  styleUrl: './champion-list.css'
})
export class ChampionList implements OnInit {

  private dataDragon = inject(DataDragon);

  allChampions: ChampionDisplay[] = [];
  filteredChampions: ChampionDisplay[] = [];
  searchControl = new FormControl<string>('', { nonNullable: true });
  loading: boolean = true;

  ngOnInit() {
    this.dataDragon.getChampionsMap().subscribe(() => {
      this.allChampions = Object.values(this.dataDragon.championsMap)
        .map((name): ChampionDisplay => ({
          name: name as string,
          imageUrl: this.dataDragon.getChampionImageUrl2(name as string)
        }))
        .sort((a, b) => a.name.localeCompare(b.name));

      this.filteredChampions = [...this.allChampions];
      this.loading = false;
    });

    // Filtrage en temps réel avec debounce
    this.searchControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(value => {
      this.filteredChampions = this.allChampions.filter(champ =>
        champ.name.toLowerCase().includes(value.toLowerCase())
      );
    });
  }
}