import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'calculator-page',
  imports: [],
  templateUrl: './calculator-page.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalculatorPageComponent {

 }
