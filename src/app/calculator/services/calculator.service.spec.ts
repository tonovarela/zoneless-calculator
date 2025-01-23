import { TestBed } from "@angular/core/testing";
import { CalculatorService } from "./calculator.service";
describe(`CalculatorService`, () => {
    let service: CalculatorService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CalculatorService);
    });
    

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should be created with default values', () => {
        expect(service.resultText()).toBe('0');
        expect(service.subResultText()).toBe('0');
        expect(service.lastOperator()).toBe('+');
    });


    it('should set result text to "0" when C is pressed', () => {        
        service.lastOperator.set('+');
        service.subResultText.set('456');
        service.resultText.set('123');
        service.constructNumber('C');
        expect(service.resultText()).toBe('0');
        expect(service.subResultText()).toBe('0');
        expect(service.lastOperator()).toBe('+');
        
    });
    it('should update result textText with number input 1', () => {
        service.constructNumber('1');
        expect(service.resultText()).toBe('1');
        
    });
    it('should handle operators correct', () => { 
        service.constructNumber('1');
        service.constructNumber('/');
        expect(service.lastOperator()).toBe('/');
        expect(service.subResultText()).toBe('1');
        expect(service.resultText()).toBe('0');
        
    });
    it('should calculate correctly', () => {
        service.constructNumber('1');
        service.constructNumber('0');
        service.constructNumber('/');
        service.constructNumber('2');        
        service.constructNumber('=');
        expect(service.resultText()).toBe('5');
        expect(service.subResultText()).toBe('0');
        expect(service.lastOperator()).toBe('/');
    });
    it('should handle backspace correctly', () => {
        service.constructNumber('1');
        service.constructNumber('0');
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('1');
        service.constructNumber('Backspace');
        expect(service.resultText()).toBe('0');
    });

    it('should handle point correctly', () => {
        service.constructNumber('1');
        service.constructNumber('.');
        service.constructNumber('2');
        expect(service.resultText()).toBe('1.2');
    });
    it('should handle decimal point starting with 0', () => {
        service.constructNumber('0');
        service.constructNumber('.');
        service.constructNumber('2');
        expect(service.resultText()).toBe('0.2');
    });

    it('should handle max length', () => {
        service.constructNumber('1');
        service.constructNumber('2');
        service.constructNumber('3');
        service.constructNumber('4');
        service.constructNumber('5');
        service.constructNumber('6');
        service.constructNumber('7');
        service.constructNumber('8');
        service.constructNumber('9');
        service.constructNumber('0');
        service.constructNumber('1');
        expect(service.resultText()).toBe('1234567890');
        service.constructNumber('2');
        expect(service.resultText()).toBe('1234567890');
    });
    it('should handle sign name correctly', () => {
        service.constructNumber('1');
        service.constructNumber('+/-');
        expect(service.resultText()).toBe('-1');
        service.constructNumber('+/-');
        expect(service.resultText()).toBe('1');
    });

    it('should handle correct number',()=>{
        service.constructNumber('1');
        service.constructNumber('a');
        expect(service.resultText()).toBe('1');
    })

    it('should remove negative operator if result text is negative',()=>{
        
        service.constructNumber('1');
        service.constructNumber('+/-');
        service.constructNumber('Backspace');
        console.log(service.resultText());
        expect(service.resultText()).toBe('0');

    });
    
       



});



