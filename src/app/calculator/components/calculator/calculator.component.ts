import { ChangeDetectionStrategy, Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from '../calculator-button/calculator-button.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

@Component({
  selector: 'calculator',
  imports: [CalculatorButtonComponent],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'(document:keyup)': 'handleKeyBoardEvent($event)'}
})
export class CalculatorComponent {
  private _calculatorService = inject(CalculatorService);
  private _calculatorButtons = viewChildren(CalculatorButtonComponent)

  public resultText = computed(() => this._calculatorService.resultText());
  public subResultText = computed(() => this._calculatorService.subResultText());
  public lastOperator = computed(() => this._calculatorService.lastOperator());

  handleClick(key: string): void {
    this._calculatorService.constructNumber(key);
  }
  handleKeyBoardEvent(event: KeyboardEvent): void {
    const key = event.key;
    
    const keyEquivalent: Record<string, string> = {
      '*': 'x',
      '/': '÷',
      'Enter': '=',
      'Clear': 'C',
      'Escape': 'C'
    };
    const keyToUse = keyEquivalent[key] ?? key;
    this.handleClick(keyToUse);
    this._calculatorButtons()
      .find(button => button.contentText() === key)
      ?.keyBoardPressedStyle(key);
  }
}
