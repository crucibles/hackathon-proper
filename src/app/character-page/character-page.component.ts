import { Component, OnInit, ViewChild } from '@angular/core';

import { BadgeModal } from '../shared/pages/badge-modal/badge-modal';

@Component({
	selector: 'app-character-page',
	templateUrl: './character-page.component.html',
	styleUrls: ['./character-page.component.css']
})
export class CharacterPageComponent implements OnInit {
	@ViewChild('badgeModal') badgeModal: BadgeModal;

	private dayBanana: number = 3;
	private totalBanana: number = 3;
	private bananaPerc: string = '0%';
	private maxbananalvl: number = 10;
	private charlvl: number = 3;
	private nutriValue: any = {
		totalFat: 0.3,
		cholesterol: 0,
		sodium: 1,
		potassium: 358,
		totalCarbs: 23,
		protein: 1.1
	}
	private computedNutriValue: any;

	constructor() { }

	ngOnInit() {
		this.initialize();
		this.computeNutriValue();
	}

	initialize(){
		this.bananaPerc = (this.totalBanana / this.maxbananalvl * 100) + '%';
	}

	computeNutriValue() {
		let mult: number = this.dayBanana;
		this.computedNutriValue = {
			totalFat: Math.round(this.nutriValue.totalFat * mult * 100) / 100,
			cholesterol: Math.round(this.nutriValue.cholesterol  * mult * 100) / 100,
			sodium: Math.round(this.nutriValue.sodium  * mult * 100) / 100,
			potassium: Math.round(this.nutriValue.potassium  * mult * 100) / 100,
			totalCarbs: Math.round(this.nutriValue.totalCarbs  * mult * 100) / 100,
			protein: Math.round(this.nutriValue.protein * mult * 100) / 100
		}
	}

	eatBanana(){
		this.totalBanana++;
		this.dayBanana++;
		if(this.totalBanana >= this.maxbananalvl){
			console.log("LVLUP");
			this.badgeModal.open();
			this.charlvl++;
			this.maxbananalvl = this.maxbananalvl * 5;
		}
		this.bananaPerc = (this.totalBanana / this.maxbananalvl * 100) + '%';
		this.computeNutriValue();
	}

}
