import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { RiotApiService } from '../../services/riot-api';
import { DataDragon } from '../../services/data-dragon';

@Component({
  selector: 'app-match-history',
  imports: [],
  templateUrl: './match-history.html',
  styleUrl: './match-history.css'
})
export class MatchHistory implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private riotApi = inject(RiotApiService);
  dataDragon = inject(DataDragon);

  matches: any[] = [];
  puuid: string = '';
  gameName: string = '';
  loading: boolean = true;
  error: string = '';

  ngOnInit() {
    this.dataDragon.getChampionsMap().subscribe(() => {
      this.route.paramMap.pipe(
        switchMap(params => {
          this.gameName = params.get('name') ?? '';
          const tag = params.get('tag') ?? '';
          return this.riotApi.getAccountByRiotId(this.gameName, tag);
        }),
        switchMap(account => {
          this.puuid = account.puuid;
          return this.riotApi.getMatchIds(this.puuid);
        })
      ).subscribe({
        next: matchIds => this.loadMatches(matchIds),
        error: err => {
          this.error = 'Impossible de charger les parties !';
          this.loading = false;
          console.error(err);
        }
      });
    });
  }

  loadMatches(matchIds: string[]) {
    this.matches = [];
    let loaded = 0;

    matchIds.forEach(matchId => {
      this.riotApi.getMatchDetail(matchId).subscribe({
        next: match => {
          const player = match.info.participants.find(
            (p: any) => p.puuid === this.puuid
          );
          if (player) {
            this.matches.push({
              matchId,
              champion: player.championName,
              kills: player.kills,
              deaths: player.deaths,
              assists: player.assists,
              cs: player.totalMinionsKilled,
              win: player.win,
              duration: match.info.gameDuration,
              gameMode: match.info.gameMode
            });
            this.matches.sort((a, b) => b.matchId.localeCompare(a.matchId));
          }
          loaded++;
          if (loaded === matchIds.length) this.loading = false;
        },
        error: err => {
          loaded++;
          if (loaded === matchIds.length) this.loading = false;
          console.error(err);
        }
      });
    });
  }

  formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  }

  goToDetail(matchId: string) {
    this.router.navigate(['/match', matchId]);
  }

  getChampionImageUrl(championName: string): string {
    return this.dataDragon.getChampionImageUrl2(championName);
  }
}