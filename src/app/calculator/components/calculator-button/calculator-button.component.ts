import {  ChangeDetectionStrategy, Component,  computed,  ElementRef,  HostBinding, input, OnInit, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  imports: [],
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  host:{
    class:`border-r border-b border-indigo-400`,  
    '[class.w-2/4]': 'isDoubleSize()', 
    '[class.w-1/4]': '!isDoubleSize()', 
  }, 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorButtonComponent implements OnInit  {
  public onClick = output<string>();
  public isCommand =input( false,{transform: (value: string | boolean) => typeof value === 'string' ? value=='': value});
  public isDoubleSize= input( false,{transform: (value: string | boolean) => typeof value === 'string' ? value=='': value});
  public isPressed = signal(false);
  public contentValue= viewChild<ElementRef<HTMLButtonElement>>('button');

  private _contextText=signal('');
  public  contentText =computed(()=>this._contextText().trim());
   
  ngOnInit(): void {
    this._contextText.set(this.contentValue()?.nativeElement.innerText || '');
  }

  public handleClick(): void {    
    if (this.contentText().length === 0) {
      return
    }
    this.onClick.emit(this.contentText());
  }


  public keyBoardPressedStyle(key:string ){        
    this.isPressed.set(true);
    setTimeout(() => this.isPressed.set(false), 100);
  }

}
