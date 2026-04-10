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
}