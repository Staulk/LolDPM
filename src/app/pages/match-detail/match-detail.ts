import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RiotApiService } from '../../services/riot-api';
import { DataDragon } from '../../services/data-dragon';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-match-detail',
  imports: [DecimalPipe],
  templateUrl: './match-detail.html',
  styleUrl: './match-detail.css',
})
export class MatchDetail implements OnInit {

  private route = inject(ActivatedRoute);
  private riotApi = inject(RiotApiService);
  dataDragon = inject(DataDragon);

  match: any = null;
  team1: any[] = [];
  team2: any[] = [];
  loading = true;
  error = '';

  ngOnInit() {
    const matchId = this.route.snapshot.paramMap.get('matchId') ?? '';
    this.riotApi.getMatchDetail(matchId).subscribe({
      next: (match) => {
        this.match = match;
        const participants = match.info.participants;
        this.team1 = participants.filter((p: any) => p.teamId === 100);
        this.team2 = participants.filter((p: any) => p.teamId === 200);
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Impossible de charger la partie.';
        this.loading = false;
        console.error(err);
      }
    });
  }

  getKDA(p: any): string {
    return `${p.kills}/${p.deaths}/${p.assists}`;
  }

  formatDuration(seconds: number): string {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}m ${sec < 10 ? '0' : ''}${sec}s`;
  }

  getItems(p: any): number[] {
    return [p.item0, p.item1, p.item2, p.item3, p.item4, p.item5, p.item6];
  }

  getTeamResult(teamId: number): string {
    const team = this.match.info.teams.find((t: any) => t.teamId === teamId);
    return team?.win ? 'Victoire' : 'Défaite';
  }

  isTeamWin(teamId: number): boolean {
    const team = this.match.info.teams.find((t: any) => t.teamId === teamId);
    return team?.win ?? false;
  }
}
