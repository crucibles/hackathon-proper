import { 
	ToastOptions 
} from 'ng2-toastr/src/toast-options';

export class CustomOption extends ToastOptions {
	animate = 'flyLeft'; // you can override any options available
    newestOnTop = false;
	showCloseButton = true;
	toastLife = 3000;
}