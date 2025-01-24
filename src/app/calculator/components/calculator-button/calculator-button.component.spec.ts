import { ComponentFixture, TestBed } from "@angular/core/testing";
import { CalculatorButtonComponent } from "./calculator-button.component";
import { Component } from "@angular/core";

@Component({
    standalone: true,
    imports: [CalculatorButtonComponent],
    template: `<calculator-button>
                <span class="project-content underline">Test content</span>
                </calculator-button>`
})
class TestHostComponent { }


describe('CalculatorButtonComponent', () => {
    let fixture: ComponentFixture<CalculatorButtonComponent>;
    let compiled: HTMLElement;
    let component: CalculatorButtonComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CalculatorButtonComponent]
        }).compileComponents();
        fixture = TestBed.createComponent(CalculatorButtonComponent);
        compiled = fixture.nativeElement
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should contain isDoubleSize is false', () => {
        fixture.componentRef.setInput('isDoubleSize', false);
        fixture.detectChanges();
        expect(component.isDoubleSize()).toBeFalsy();
        const listClass = compiled.classList.value.split(' ');
        expect(listClass).toContain('w-1/4');
    });

    it('should contain class w-2/7 when isDoubleSize is true', () => {
        fixture.componentRef.setInput('isDoubleSize', true);
        fixture.detectChanges();
        expect(component.isDoubleSize()).toBeTruthy();
        const listClass = compiled.classList.value.split(' ');
        expect(listClass).toContain('w-2/4');
    });
    it('should emit onClick when handleClick is called', () => {
        spyOn(component.onClick, 'emit');
        component.handleClick();
        expect(component.onClick.emit).toHaveBeenCalled();
        expect(component.onClick.emit).toHaveBeenCalledWith('');
    });

    it('should set isPressed to true and then false when keyBoardPressedStyle is called with a  matching key', (done) => {
        component.contentValue()!.nativeElement.innerText = '1';
        component.keyBoardPressedStyle('1');
        expect(component.isPressed()).toBeTruthy();
        setTimeout(() => { expect(component.isPressed()).toBeFalsy(); done() }, 1000);
    });

    it('should display projected content', () => {
        const testHostFixture = TestBed.createComponent(TestHostComponent);
        const hostElement = testHostFixture.nativeElement as HTMLDivElement;  
        expect(hostElement.querySelector('.project-content')).toBeTruthy();  
        
        expect(hostElement.querySelector(".project-content")?.classList.contains("underline")).toBeTruthy();
        expect(hostElement.querySelector('.project-content')!.textContent).toBe('Test content');
    });







});