import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { switchMap } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { RiotApiService } from '../../services/riot-api';
import { DataDragon } from '../../services/data-dragon';
import { Summoner } from '../../interfaces/summoner';
import { Rank } from '../../interfaces/rank';
import { Mastery } from '../../interfaces/mastery';

@Component({
  selector: 'app-profile',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  private route = inject(ActivatedRoute);
  private riotApi = inject(RiotApiService);
  dataDragon = inject(DataDragon);

  summoner: Summoner | null = null;
  ranks: Rank[] = [];
  masteries: Mastery[] = [];
  puuid: string = '';
  gameName: string = '';
  tagLine: string = '';
  loading: boolean = true;
  error: string = '';

  ngOnInit() {
    this.dataDragon.getChampionsMap().subscribe(() => {
      this.route.paramMap.pipe(
        switchMap(params => {
          this.gameName = params.get('name') ?? '';
          this.tagLine = params.get('tag') ?? '';
          return this.riotApi.getAccountByRiotId(this.gameName, this.tagLine);
        }),
        switchMap(account => {
          this.puuid = account.puuid;
          return this.riotApi.getSummonerByPuuid(account.puuid);
        })
      ).subscribe({
        next: summoner => {
          this.summoner = summoner;
          this.loading = false;
          this.loadRanksAndMasteries(this.puuid);
        },
        error: err => {
          this.error = 'Joueur introuvable !';
          this.loading = false;
          console.error(err);
        }
      });
    });
  }

  loadRanksAndMasteries(puuid: string) {
    // Récupération des rangs
    this.riotApi.getRanks(puuid).subscribe({
      next: ranks => this.ranks = ranks,
      error: err => console.error(err)
    });

    // Récupération des maîtrises
    this.riotApi.getTopMasteries(puuid).subscribe({
      next: masteries => this.masteries = masteries,
      error: err => console.error(err)
    });
  }

  getWinrate(wins: number, losses: number): number {
    return Math.round((wins / (wins + losses)) * 100);
  }
}