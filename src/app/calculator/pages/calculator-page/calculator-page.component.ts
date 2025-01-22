import { CalculatorComponent } from '@/calculator/components/calculator/calculator.component';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'calculator-page',
  imports: [CalculatorComponent],
  templateUrl: './calculator-page.component.html',  
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CalculatorPageComponent {

 }
