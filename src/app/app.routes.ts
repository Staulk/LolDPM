import { Routes } from '@angular/router';
import { Search } from './pages/search/search';
import { Profile } from './pages/profile/profile';
import { MatchHistory } from './pages/match-history/match-history';
import { MatchDetail } from './pages/match-detail/match-detail';
import { ChampionList } from './pages/champion-list/champion-list';

export const routes: Routes = [
    { path: '', component: Search },
    { path: 'summoner/:region/:name/:tag', component: Profile },
    { path: 'summoner/:region/:name/:tag/matches', component: MatchHistory },
    { path: 'match/:matchId', component: MatchDetail },
    { path: 'champions', component: ChampionList },
    { path: '**', redirectTo: '' }
];
