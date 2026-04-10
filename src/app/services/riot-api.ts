import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RiotApiService {

  private http = inject(HttpClient);

  // Clé API Riot (à renouveler toutes les 24h)
  private apiKey = 'RGAPI-b467856a-1da4-4418-9822-e88883cfbe90';

  private get headers(): HttpHeaders {
    return new HttpHeaders({ 'X-Riot-Token': this.apiKey });
  }

  // Récupère le PUUID depuis le Riot ID (europe)
  getAccountByRiotId(gameName: string, tagLine: string): Observable<any> {
    return this.http.get(
      `/riot-api-regional/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      { headers: this.headers }
    );
  }

  // Récupère les infos du summoner depuis le PUUID (euw1)
  getSummonerByPuuid(puuid: string): Observable<any> {
    return this.http.get(
      `/riot-api/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      { headers: this.headers }
    );
  }

  // Récupère les rangs depuis le summonerId (euw1)
  getRanks(summonerId: string): Observable<any> {
    return this.http.get(
      `/riot-api/lol/league/v4/entries/by-summoner/${summonerId}`,
      { headers: this.headers }
    );
  }

  // Récupère le top 5 des champions maîtrisés (euw1)
  getTopMasteries(puuid: string): Observable<any> {
    return this.http.get(
      `/riot-api/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=5`,
      { headers: this.headers }
    );
  }

  // Récupère les IDs des 10 dernières parties (europe)
  getMatchIds(puuid: string): Observable<any> {
    return this.http.get(
      `/riot-api-regional/lol/match/v5/matches/by-puuid/${puuid}/ids?count=10`,
      { headers: this.headers }
    );
  }

  // Récupère le détail d'une partie (europe)
  getMatchDetail(matchId: string): Observable<any> {
    return this.http.get(
      `/riot-api-regional/lol/match/v5/matches/${matchId}`,
      { headers: this.headers }
    );
  }
}