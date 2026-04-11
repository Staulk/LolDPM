export interface MatchParticipant {
  puuid: string;
  riotIdGameName: string;
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  totalMinionsKilled: number;
  totalDamageDealtToChampions: number;
  win: boolean;
  teamId: number;
}

export interface MatchInfo {
  gameDuration: number;
  gameMode: string;
  participants: MatchParticipant[];
}

export interface Match {
  info: MatchInfo;
}