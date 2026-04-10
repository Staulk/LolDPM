import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-match-card',
  imports: [],
  templateUrl: './match-card.html',
  styleUrl: './match-card.css',
})
export class MatchCard {

  @Input() match: any;
  @Input() puuid = '';
  @Output() matchClick = new EventEmitter<string>();

  private version = '16.6.1';

  get player(): any {
    return this.match?.info?.participants?.find((p: any) => p.puuid === this.puuid);
  }

  get championImgUrl(): string {
    return `https://ddragon.leagueoflegends.com/cdn/${this.version}/img/champion/${this.player?.championName}.png`;
  }

  get kda(): string {
    const p = this.player;
    return p ? `${p.kills}/${p.deaths}/${p.assists}` : '';
  }

  get cs(): number {
    const p = this.player;
    return p ? p.totalMinionsKilled + p.neutralMinionsKilled : 0;
  }

  get duration(): string {
    const sec = this.match?.info?.gameDuration ?? 0;
    const min = Math.floor(sec / 60);
    const s = sec % 60;
    return `${min}m ${s < 10 ? '0' : ''}${s}s`;
  }

  get isWin(): boolean {
    return this.player?.win ?? false;
  }

  onClick() {
    this.matchClick.emit(this.match.metadata.matchId);
  }
}
