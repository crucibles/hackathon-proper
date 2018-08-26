import { Component, OnInit, ViewChild } from '@angular/core';

import { BadgeModal } from '../shared/pages/badge-modal/badge-modal';
import { UserService } from '../shared/services/user.service';
import { User } from '../shared/models/user';

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
	user: any;
	charname: any;

	constructor(
		private userService: UserService
	) { }

	ngOnInit() {
		this.initialize();
		this.computeNutriValue();
	}

	initialize(){
		let id: string = this.userService.getCurrentUser().getUserId();
		this.userService.getUser(id).subscribe(usr => {
			this.user = new User(usr);
			console.log(this.user.getTotalBananas());
			this.totalBanana = this.user.getTotalBananas();
			this.maxbananalvl = this.user.getLevel() * 5;
			this.charname = this.user.getMonkeyName();
			this.charlvl = this.user.getLevel();
			this.bananaPerc = (this.totalBanana / this.maxbananalvl * 100) + '%';
		});
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
			
			this.maxbananalvl = this.user.getLevel() * 5;
		}
		this.bananaPerc = (this.totalBanana / this.maxbananalvl * 100) + '%';
		this.computeNutriValue();
	}

}
