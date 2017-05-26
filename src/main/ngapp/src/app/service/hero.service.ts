import "rxjs/add/operator/toPromise";
import "rxjs/add/operator/map";

import {Observable} from "rxjs/Observable";

import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";

import {Hero} from "../model/hero";

const DELAY = 5000;

const HEROES_URL = 'api/heroes';

@Injectable()
export class HeroService {

	private headers = new Headers({'Content-Type': 'application/json'});

	constructor(private http: Http) {
	}

	getHeroes(): Promise<Hero[]> {
		return this.http.get(HEROES_URL).toPromise().then(response => response.json().data as Hero[]).catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
		console.error('An error occurred', error);

		return Promise.reject(error.message || error);
	}

	getHeroesSlowly(): Promise<Hero[]> {
		return new Promise(resolve => {
			setTimeout(() => resolve(this.getHeroes()), DELAY);
		});
	}

	getHero(id: number): Promise<Hero> {
		const url = `${HEROES_URL}/${id}`;

		return this.http.get(url).toPromise().then(response => response.json().data as Hero).catch(this.handleError);
	}

	update(hero: Hero): Promise<Hero> {
		const url = `${HEROES_URL}/${hero.id}`;

		return this.http.put(url, JSON.stringify(hero), {headers: this.headers}).toPromise().then(() => hero).catch(this.handleError);
	}

	create(name: string): Promise<Hero> {
		return this.http.post(HEROES_URL, JSON.stringify({name: name}), {headers: this.headers}).toPromise().then(result => result.json().data as Hero).catch(this.handleError);
	}

	delete(id: number): Promise<void> {
		const url = `${HEROES_URL}/${id}`;

		return this.http.delete(url, {headers: this.headers}).toPromise().then(() => null).catch(this.handleError);
	}

	search(term: string): Observable<Hero[]> {
		return this.http.get(`${HEROES_URL}/?name=${term}`).map(response => response.json().data as Hero[]);
	}
}