import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CalculatorComponent } from "./calculator.component";
import { CalculatorService } from "@/calculator/services/calculator.service";
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";
import { By } from "@angular/platform-browser";


class MockCalculatorService {

    public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
    public subResultText = jasmine.createSpy('subResultText').and.returnValue('0');
    public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

    public constructNumber = jasmine.createSpy('constructNumber');
}

describe(`CalculatorComponent`, () => {
    let fixture: ComponentFixture<CalculatorComponent>;
    let compiled: HTMLElement;
    let component: CalculatorComponent;
    let mockCalculatorService: MockCalculatorService;
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalculatorComponent],
            providers: [{
                provide: CalculatorService,
                useClass: MockCalculatorService
            }]
        }).compileComponents();
        fixture = TestBed.createComponent(CalculatorComponent);
        compiled = fixture.nativeElement
        component = fixture.componentInstance;
        mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;

        // fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('it should have the current getter', () => {
        expect(component.resultText()).toBe('100.00');
        expect(component.subResultText()).toBe('0');
        expect(component.lastOperator()).toBe('+');
    })

    it('it should display calculation values', () => {
        mockCalculatorService.resultText.and.returnValue('123');
        mockCalculatorService.subResultText.and.returnValue('0');
        mockCalculatorService.lastOperator.and.returnValue('-');
        fixture.detectChanges();
        expect(compiled.querySelector('span')?.innerText).toBe('123');
        expect(component.resultText()).toBe('123');
        expect(component.subResultText()).toBe('0');
        expect(component.lastOperator()).toBe('-');

    });

    it('it should have 19 calculator buttons', () => {
        expect(component._calculatorButtons().length).toBe(19);
    });
    it('it should have 19 calculator buttons with content projection', () => {
        const buttonsByDirective = fixture.debugElement.queryAll(By.directive(CalculatorButtonComponent));
        const buttons = compiled.querySelectorAll('calculator-button');

        expect(buttons).toBeTruthy();
        expect(buttons.length).toBe(19);

        expect(buttons[0].textContent?.trim()).toContain('C');
        expect(buttons[1].textContent?.trim()).toContain('+/-');
        expect(buttons[2].textContent?.trim()).toContain('%');
        expect(buttons[3].textContent?.trim()).toContain('÷');

        expect(buttonsByDirective).toBeTruthy();
        expect(buttonsByDirective.length).toBe(19);

        expect(buttonsByDirective[0].nativeElement.textContent).toContain('C');
    });

    it('it should handle keyboars  events', () => {
        const eventEmiter = new KeyboardEvent('keyup', { key: '1' });
        document.dispatchEvent(eventEmiter);

        expect(mockCalculatorService.constructNumber).toHaveBeenCalled();
        expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('1');

        const eventEmiterEsc = new KeyboardEvent('keyup', { key: 'Escape' });
        document.dispatchEvent(eventEmiterEsc);
        expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');


    });

    it('it should display result text correctly', () => {

        mockCalculatorService.resultText.and.returnValue('1235');
        mockCalculatorService.subResultText.and.returnValue('10');
        mockCalculatorService.lastOperator.and.returnValue('-');    
        fixture.detectChanges();
        expect(component.resultText()).toBe('1235');
        expect(component.subResultText()).toBe('10');
        expect(component.lastOperator()).toBe('-');
    });




});



