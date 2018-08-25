//Core Imports
import {
	Component,
	OnInit,
	ElementRef
} from '@angular/core';

import {
	Router
} from '@angular/router';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
	isCollapsed: boolean;

	constructor(
		private elementRef: ElementRef//,
		//private router: Router
	) { }

	ngOnInit() {
		this.isCollapsed = true;
	}

	/**
	 * Logs out the current user
	 */
	logOut() {
	}

	/* Helper function */
	handleClick(event) {
		var clickedComponent = event.target;
		var inside = false;
		do {
			if (clickedComponent === this.elementRef.nativeElement) {
				inside = true;
			}
			clickedComponent = clickedComponent.parentNode;
		} while (clickedComponent);
		if (!inside) {
			this.isCollapsed = true;
		}
	}

}
