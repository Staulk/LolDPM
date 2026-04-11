import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Summoner } from '../interfaces/summoner';
import { Rank } from '../interfaces/rank';
import { Mastery } from '../interfaces/mastery';
import { Match } from '../interfaces/match';

@Injectable({
  providedIn: 'root'
})
export class RiotApiService {

  private http = inject(HttpClient);

  // Ma clé Api
  private apiKey = 'RGAPI-b467856a-1da4-4418-9822-e88883cfbe90';

  private get headers(): HttpHeaders {
    return new HttpHeaders({ 'X-Riot-Token': this.apiKey });
  }

  // Récupère le PUUID depuis le Riot ID (europe)
  getAccountByRiotId(gameName: string, tagLine: string): Observable<{ puuid: string }> {
    return this.http.get<{ puuid: string }>(
      `/riot-api-regional/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}`,
      { headers: this.headers }
    );
  }

  // Récupère les infos du summoner depuis le PUUID (euw1)
  getSummonerByPuuid(puuid: string): Observable<Summoner> {
    return this.http.get<Summoner>(
      `/riot-api/lol/summoner/v4/summoners/by-puuid/${puuid}`,
      { headers: this.headers }
    );
  }

  // Récupère les rangs depuis le PUUID (euw1)
  getRanks(puuid: string): Observable<Rank[]> {
    return this.http.get<Rank[]>(
      `/riot-api/lol/league/v4/entries/by-puuid/${puuid}`,
      { headers: this.headers }
    );
  }

  // Récupère le top 5 des champions maîtrisés (euw1)
  getTopMasteries(puuid: string): Observable<Mastery[]> {
    return this.http.get<Mastery[]>(
      `/riot-api/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=5`,
      { headers: this.headers }
    );
  }

  // Récupère les IDs des 10 dernières parties (europe)
  getMatchIds(puuid: string): Observable<string[]> {
    return this.http.get<string[]>(
      `/riot-api-regional/lol/match/v5/matches/by-puuid/${puuid}/ids?count=10`,
      { headers: this.headers }
    );
  }

  // Récupère le détail d'une partie (europe)
  getMatchDetail(matchId: string): Observable<Match> {
    return this.http.get<Match>(
      `/riot-api-regional/lol/match/v5/matches/${matchId}`,
      { headers: this.headers }
    );
  }
}