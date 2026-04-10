import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, forkJoin } from 'rxjs';
import { RiotApiService } from '../../services/riot-api';
import { MatchCard } from '../../components/match-card/match-card';

@Component({
  selector: 'app-match-history',
  imports: [MatchCard],
  templateUrl: './match-history.html',
  styleUrl: './match-history.css',
})
export class MatchHistory implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private riotApi = inject(RiotApiService);

  matches: any[] = [];
  puuid = '';
  gameName = '';
  loading = true;
  error = '';

  ngOnInit() {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.gameName = params.get('name') ?? '';
        const tag = params.get('tag') ?? '';
        return this.riotApi.getAccountByRiotId(this.gameName, tag);
      }),
      switchMap(account => {
        this.puuid = account.puuid;
        return this.riotApi.getMatchIds(account.puuid);
      }),
      switchMap((matchIds: string[]) => {
        return forkJoin(matchIds.map(id => this.riotApi.getMatchDetail(id)));
      })
    ).subscribe({
      next: (matches) => {
        this.matches = matches;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Impossible de charger l\'historique.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  onMatchClick(matchId: string) {
    this.router.navigate(['/match', matchId]);
  }
}
