import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataDragon {

  private http = inject(HttpClient);
  private version = '16.6.1';
  championsMap: any = null;

  getChampionsMap(): Observable<any> {
    return this.http.get(
      `https://ddragon.leagueoflegends.com/cdn/${this.version}/data/en_US/champion.json`
    ).pipe(
      map((data: any) => {
        this.championsMap = {};
        Object.values(data.data).forEach((champ: any) => {
          this.championsMap[champ.key] = champ.id;
        });
        return this.championsMap;
      })
    );
  }

  getChampionImageUrl(championId: number): string {
    if (!this.championsMap) return '';
    const name = this.championsMap[championId.toString()];
    return `https://ddragon.leagueoflegends.com/cdn/${this.version}/img/champion/${name}.png`;
  }

  getProfileIconUrl(iconId: number): string {
    return `https://ddragon.leagueoflegends.com/cdn/${this.version}/img/profileicon/${iconId}.png`;
  }

  getItemImageUrl(itemId: number): string {
    if (itemId === 0) return '';
    return `https://ddragon.leagueoflegends.com/cdn/${this.version}/img/item/${itemId}.png`;
  }

  getSummonerSpellImageUrl(spellId: number): string {
    const spellMap: Record<number, string> = {
      1: 'SummonerBoost', 2: 'SummonerClairvoyance', 3: 'SummonerExhaust',
      4: 'SummonerFlash', 6: 'SummonerHaste', 7: 'SummonerHeal',
      11: 'SummonerSmite', 12: 'SummonerTeleport', 13: 'SummonerMana',
      14: 'SummonerDot', 21: 'SummonerBarrier', 30: 'SummonerPoroRecall',
      31: 'SummonerPoroThrow', 32: 'SummonerSnowball', 39: 'SummonerSnowURFSnowball_Mark',
      54: 'Summoner_UltBookPlaceholder', 55: 'Summoner_UltBookSmitePlaceholder',
      2202: 'SummonerFlash' // Cherry (Arena)
    };
    const name = spellMap[spellId] || 'SummonerFlash';
    return `https://ddragon.leagueoflegends.com/cdn/${this.version}/img/spell/${name}.png`;
  }

  getAllChampions(): Observable<any[]> {
    return this.http.get<any>(
      `https://ddragon.leagueoflegends.com/cdn/${this.version}/data/en_US/champion.json`
    ).pipe(
      map((data: any) => {
        return Object.values(data.data) as any[];
      })
    );
  }

  getChampionSquareUrl(championId: string): string {
    return `https://ddragon.leagueoflegends.com/cdn/${this.version}/img/champion/${championId}.png`;
  }
}