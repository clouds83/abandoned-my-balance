import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appInputWidth]',
})
export class InputWidthDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.width = '160px';
  }

  @HostListener('focus') onFocus() {
    this.el.nativeElement.style.width = '240px';
    this.el.nativeElement.classList.add('animationCard');
  }

  @HostListener('blur') onBlur() {
    this.el.nativeElement.style.width = '160px';
  }
}
