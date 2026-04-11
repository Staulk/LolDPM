import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DecimalPipe } from '@angular/common';
import { RiotApiService } from '../../services/riot-api';
import { DataDragon } from '../../services/data-dragon';
import { Match, MatchParticipant } from '../../interfaces/match';

@Component({
  selector: 'app-match-detail',
  imports: [DecimalPipe],
  templateUrl: './match-detail.html',
  styleUrl: './match-detail.css'
})
export class MatchDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private riotApi = inject(RiotApiService);
  dataDragon = inject(DataDragon);

  match: Match | null = null;
  blueTeam: MatchParticipant[] = [];
  redTeam: MatchParticipant[] = [];
  loading: boolean = true;
  error: string = '';

  ngOnInit() {
    this.dataDragon.getChampionsMap().subscribe(() => {
      this.route.paramMap.subscribe(params => {
        const matchId = params.get('matchId') ?? '';
        this.riotApi.getMatchDetail(matchId).subscribe({
          next: (match: Match) => {
            this.match = match;
            // Séparation des deux équipes
            this.blueTeam = match.info.participants.filter(p => p.teamId === 100);
            this.redTeam = match.info.participants.filter(p => p.teamId === 200);
            this.loading = false;
          },
          error: err => {
            this.error = 'Impossible de charger la partie !';
            this.loading = false;
            console.error(err);
          }
        });
      });
    });
  }

  formatDuration(seconds: number): string {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}m ${s}s`;
  }

  goBack() {
    history.back();
  }
}